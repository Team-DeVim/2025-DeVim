const ThemeSwitch = ({ name = '토글버튼', className = '' }) => {


    return (
        <button
            type="button"
            className={className}
            onClick={() => {
                const root = document.documentElement;
                const next = root.dataset.theme === 'game' ? 'code' : 'game';
                root.dataset.theme = next;
                root.style.colorScheme = next === 'code' ? 'dark' : 'light';
                localStorage.setItem('theme', next);
            }}
        >
            {name}
        </button>
    );
};

export default ThemeSwitch