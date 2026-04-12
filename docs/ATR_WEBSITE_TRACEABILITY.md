# ATR Website Traceability

## Purpose
- Map ATR PDF sections to internal documentation and website implementation surfaces.

## Mapping Table
| ATR PDF | Architecture focus | Documentation target | Website surface | Implementation source |
|---|---|---|---|---|
| `01_GEM_ATR_Foundation_Architecture.pdf` | Foundational controls and governance baseline | `docs/phase-1/1.1-foundational-architecture.md` | `/atr-framework` -> Foundational Architecture block | `src/data/atr/framework.ts` (`foundation`) |
| `02_GEM_ATR_Execution_Architecture.pdf` | Execution and build model | `docs/phase-2/*` | `/atr-framework` -> Execution and Build Architecture block | `src/data/atr/framework.ts` (`execution`) |
| `03_GEM_ATR_Delivery_Deployment_Framework.pdf` | Delivery automation and deployment governance | `docs/phase-3/*` | `/atr-framework` -> Delivery, Automation and Deployment block | `src/data/atr/framework.ts` (`delivery`) |
| `04_GEM_ATR_Enterprise_Governance_and_Scaling.pdf` | Enterprise governance, scaling, and AI controls | `docs/phase-4/*` | `/atr-framework` -> Enterprise Governance and Scaling block | `src/data/atr/framework.ts` (`governance`) |

## Navigation and Discovery Mapping
- Public navigation link: `src/components/layout/NavigationPublic.tsx`
- Legacy navigation link: `src/components/layout/Navbar.tsx`
- Public footer quick links: `src/components/layout/FooterPublic.tsx`
- Legacy footer quick links: `src/components/layout/Footer.tsx`
- Resource hub ATR discovery cards: `src/app/resources/page.tsx`
- Homepage ATR highlight card: `src/components/marketing/FeatureGrid.tsx`

## Asset Locations
- `public/docs/atr/01_GEM_ATR_Foundation_Architecture.pdf`
- `public/docs/atr/02_GEM_ATR_Execution_Architecture.pdf`
- `public/docs/atr/03_GEM_ATR_Delivery_Deployment_Framework.pdf`
- `public/docs/atr/04_GEM_ATR_Enterprise_Governance_and_Scaling.pdf`

