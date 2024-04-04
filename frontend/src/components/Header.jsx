import React, { useState } from "react";

function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-white-800">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <div className="flex items-center justify-between w-full">
          <a className="flex-none text-xl font-semibold dark:text-black" href="/">
            Zabbix Store
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10"
              onClick={toggleCollapse}
              aria-expanded={!isCollapsed}
              aria-label="Toggle navigation"
            >
              <svg
                className={isCollapsed ? "hs-collapse-open:hidden flex-shrink-0 size-4" : "hs-collapse-open:block hidden flex-shrink-0 size-4"}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isCollapsed ? (
                  <>
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <line x1="3" x2="21" y1="12" y2="12" />
                    <line x1="3" x2="21" y1="18" y2="18" />
                  </>
                ) : (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        <div className={`sm:flex flex-col p-2 display flex sm:flex-row sm:items-center sm:justify-end w-full ${isCollapsed ? "hidden" : "sm:flex"}`}>
          <a
            className="font-medium
            font-medium text-black-600 mr-5 link-mobile-margin"
            href="/product"
          >
            Tela inicial
          </a>
          <a className="font-medium text-black-600 mr-5 link-mobile-margin link-with-underline" href="/aboutus">
            Sobre nós
          </a>
          <a className="font-medium text-black-600 mr-5 link-mobile-margin " href="/product">
            Produtos
          </a>
          <a className="font-medium text-white bg-black mr-5 px-4 py-2 link-no-hover link-mobile-margin " href="/register">
            Cadastrar
          </a>
          <a className="font-medium text-white bg-black mr-5 px-4 py-2 link-no-hover link-mobile-margin" href="/login">
            Login
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
