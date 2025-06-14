export const ModeSwitcher = ({ mode, setMode }) => {
    return (
        <div className="mode-switcher">
            <button
                className={mode === 'runtime' ? 'active' : ''}
                onClick={() => setMode('runtime')}
            >
                Runtime
            </button>
            <button
                className={mode === 'constructor' ? 'active' : ''}
                onClick={() => setMode('constructor')}
            >
                Constructor
            </button>
        </div>
    );
};