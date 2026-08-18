// components/events/Pagination.jsx

function PageButton({ page, isCurrent, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(page)}
      className={`px-3 py-2 rounded-lg flex flex-col justify-center items-center ${
        isCurrent ? "bg-Primaire" : ""
      }`}
    >
      <span
        className={`text-base font-normal font-['Olympic_Sans'] leading-4 ${
          isCurrent ? "text-Text-Brand-On-Brand" : "text-Text-Default-Default"
        }`}
      >
        {page}
      </span>
    </button>
  );
}

export default function Pagination({ currentPage, totalPages, onChange }) {
  // Affiche 1, 2, 3 ... avant-dernière, dernière (comme la maquette)
  const pages = [1, 2, 3];

  return (
    <nav className="self-stretch pb-24 flex justify-center items-start">
      <div className="flex justify-start items-center gap-2">
        {pages.map((p) => (
          <PageButton key={p} page={p} isCurrent={p === currentPage} onClick={onChange} />
        ))}
        <span className="px-4 py-2 text-black-100 text-base font-bold font-['Olympic_Sans_Bold'] leading-6">
          ...
        </span>
        <PageButton page={totalPages - 1} isCurrent={totalPages - 1 === currentPage} onClick={onChange} />
        <PageButton page={totalPages} isCurrent={totalPages === currentPage} onClick={onChange} />
      </div>
    </nav>
  );
}