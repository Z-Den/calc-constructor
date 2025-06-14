export const ModeSwitcher = ({ mode, setMode }) => {
    return (
        <div className="mode-switcher">
            <button
                className={
                    mode === 'runtime' ? 'mode-button active' : 'mode-button'
                }
                onClick={() => setMode('runtime')}
            >
                Runtime
            </button>
            <button
                className={
                    mode === 'constructor' ? 'mode-button active' : 'mode-button'
                }
                onClick={() => setMode('constructor')}
            >
                Constructor
            </button>
        </div>
    );
};