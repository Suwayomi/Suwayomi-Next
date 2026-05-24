"use client";

export function ThemeInitializer() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
			const saved_theme = localStorage.getItem("piper-theme");
			if (saved_theme) {
			    	document.documentElement.classList.toggle("dark", saved_theme==="dark");
			}
			const saved_accent = localStorage.getItem("piper-accent");
			if (saved_accent) {
			    document.documentElement.style.setProperty("--primary", saved);
			    document.documentElement.style.setProperty("--ring", saved);
			}
			`,
            }}
        ></script>
    );
}
