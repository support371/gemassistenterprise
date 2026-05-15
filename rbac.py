from functools import wraps
from flask import session, abort
from models import User, OrgMembership, RBACRole
import logging

logger = logging.getLogger(__name__)


def require_role(*allowed_roles):
    """RBAC decorator to enforce role-based access control"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_id = session.get('user_id')
            org_id = session.get('org_id')
            
            if not user_id or not org_id:
                logger.warning(f"Access denied: user_id={user_id}, org_id={org_id}")
                abort(403)
            
            try:
                membership = OrgMembership.query.filter_by(
                    user_id=user_id,
                    org_id=org_id
                ).first()
                
                if not membership or membership.role not in allowed_roles:
                    logger.warning(f"Insufficient role: user_id={user_id}, org_id={org_id}, required={allowed_roles}, has={membership.role if membership else 'None'}")
                    abort(403)
                    
            except Exception as e:
                logger.error(f"RBAC check failed: {e}")
                abort(500)
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator


def log_audit_event(user_id, org_id, action, resource_type=None, resource_id=None, details=None, request_obj=None):
    """Log an audit event"""
    try:
        from models import AuditEvent, db
        
        ip_address = None
        if request_obj:
            ip_address = request_obj.remote_addr or request_obj.headers.get('X-Forwarded-For')
        
        event = AuditEvent(
            user_id=user_id,
            org_id=org_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            details=details,
            ip_address=ip_address
        )
        db.session.add(event)
        db.session.commit()
        logger.info(f"Audit: {action} by user={user_id} org={org_id} resource={resource_type}:{resource_id}")
    except Exception as e:
        logger.error(f"Failed to log audit event: {e}")
