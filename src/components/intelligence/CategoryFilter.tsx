type CategoryFilterProps = {
  categories: string[];
};

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <section className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
        >
          {category}
        </button>
      ))}
    </section>
  );
}
