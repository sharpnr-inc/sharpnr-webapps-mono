import React from 'react';

interface RestaurantOrdersPageProps {}

const RestaurantOrdersPage: React.FC<RestaurantOrdersPageProps> = () => {
    // Basic styles for a centered, colorless "Under Development" notice
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        border: '1px solid #ddd',
        borderRadius: '8px',
        margin: '20px'
    };

    const headingStyle: React.CSSProperties = {
        fontSize: '2rem',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    const textStyle: React.CSSProperties = {
        fontSize: '1rem',
        opacity: 0.7
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Feature Under Development</h1>
            <p style={textStyle}>
                The Restaurant Orders module is currently being built.
            </p>
            <p style={textStyle}>
                Integration for <strong>Bar</strong> and <strong>Kitchen</strong> modules is coming soon.
            </p>
        </div>
    );
};

export default RestaurantOrdersPage;