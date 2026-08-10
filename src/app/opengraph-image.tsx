 
import { ImageResponse } from "next/og";
import { sanjaiProfile } from "@/data/sanjai-profile";

export const runtime = "edge";

export const alt = sanjaiProfile.name;
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

const getFontData = async () => {
    try {
        const [cabinetGrotesk, clashDisplay] = await Promise.all([
            fetch(
                new URL("../../public/fonts/CabinetGrotesk-Medium.ttf", import.meta.url)
            ).then((res) => res.arrayBuffer()),
            fetch(
                new URL("../../public/fonts/ClashDisplay-Semibold.ttf", import.meta.url)
            ).then((res) => res.arrayBuffer()),
        ]);
        return { cabinetGrotesk, clashDisplay };
    } catch (error) {
        console.error("Failed to load fonts:", error);
        return null;
    }
};

const styles = {
    outerWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        position: "relative",
    },
    middleWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        position: "relative",
        padding: "40px",
    },
    wrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
        position: "relative",
        padding: "40px",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
    },
    imageSection: {
        position: "absolute",
        top: "40px",
        left: "40px",
        display: "flex",
        alignItems: "center",
        zIndex: 2,
    },
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        height: "100%",
        width: "100%",
        position: "relative",
        zIndex: 1,
    },
    image: {
        width: "72px",
        height: "72px",
        borderRadius: "16px",
        border: "3px solid #e5e5e5",
        padding: "12px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: "Clash Display",
        fontSize: "48px",
        fontWeight: "600",
        lineHeight: "1.1",
        textAlign: "left",
        color: "#000000",
        marginBottom: "16px",
        letterSpacing: "-0.02em",
        maxWidth: "900px",
    },
    description: {
        fontSize: "20px",
        fontWeight: "400",
        lineHeight: "1.5",
        textAlign: "left",
        maxWidth: "800px",
        color: "#404040",
        marginBottom: "32px",
        textWrap: "balance",
    },
} as const;

export default async function Image() {
    try {
        const fontData = await getFontData();

        return new ImageResponse(
            (
                <div style={styles.outerWrapper}>
                    <div style={styles.middleWrapper}>
                        <div style={styles.wrapper}>
                            <div style={styles.imageSection}>
                                <div style={styles.image}>
                                    <svg viewBox="0 0 32 32" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.5 8.5h7.5a3 3 0 0 1 0 6c-4 0-7.5 1.2-7.5 5.2 0 2 1.6 3.3 3.5 3.3H22"
                                            stroke="#18181b"
                                            strokeWidth="2.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle cx="9.5" cy="8.5" r="2.6" fill="#18181b" />
                                        <circle cx="13.8" cy="16.5" r="1.7" fill="#18181b" />
                                        <circle cx="22" cy="23" r="2.6" fill="#18181b" />
                                    </svg>
                                </div>
                            </div>
                            <div style={styles.mainContainer}>
                                <div style={styles.title}>{sanjaiProfile.name}</div>
                                {sanjaiProfile.headline && (
                                    <div style={styles.description}>{sanjaiProfile.headline}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                ...size,
                fonts: fontData
                    ? [
                        {
                            name: "Cabinet Grotesk",
                            data: fontData.cabinetGrotesk,
                            weight: 400,
                            style: "normal",
                        },
                        {
                            name: "Cabinet Grotesk",
                            data: fontData.cabinetGrotesk,
                            weight: 700,
                            style: "normal",
                        },
                        {
                            name: "Clash Display",
                            data: fontData.clashDisplay,
                            weight: 600,
                            style: "normal",
                        },
                    ]
                    : undefined,
            }
        );
    } catch (error) {
        console.error("Error generating OpenGraph image:", error);
        return new Response(
            `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
            {
                status: 500,
            }
        );
    }
}


