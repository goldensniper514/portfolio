export type Theme = {
    name: string;
    colors: {
        background: string;
        dots: string;
        text: {
            primary: string;
            secondary: string;
        };
        accent: {
            primary: {
                from: string;
                to: string;
            };
            secondary: {
                from: string;
                via: string;
                to: string;
            };
        };
        border: string;
        glass: {
            primary: string;
            secondary: string;
            tertiary: string;
        };
    };
};

export const themes: { [key: string]: Theme } = {
    dark: {
        name: "Dark",
        colors: {
            background: "#000000",
            dots: "#585858",
            text: {
                primary: "#ffffff",
                secondary: "#ababab",
            },
            accent: {
                primary: {
                    from: "#8c1df3",
                    to: "#621aaf",
                },
                secondary: {
                    from: "#8c1df3",
                    via: "#f714d1",
                    to: "#621aaf",
                },
            },
            border: "#2e2e2e",
            glass: {
                primary: "rgba(255, 255, 255, 0.05)",
                secondary: "rgba(26, 26, 26, 0.4)",
                tertiary: "rgba(46, 46, 46, 0.5)",
            },
        },
    },
    moonlight: {
        name: "Moonlight",
        colors: {
            background: "#f8fafc",
            dots: "#cbd5e1",
            text: {
                primary: "#1e293b",
                secondary: "#64748b",
            },
            accent: {
                primary: {
                    from: "#6366f1",
                    to: "#4f46e5",
                },
                secondary: {
                    from: "#6366f1",
                    via: "#e879f9",
                    to: "#4f46e5",
                },
            },
            border: "#e2e8f0",
            glass: {
                primary: "rgba(255, 255, 255, 0.7)",
                secondary: "rgba(241, 245, 249, 0.8)",
                tertiary: "rgba(226, 232, 240, 0.7)",
            },
        },
    },
};
