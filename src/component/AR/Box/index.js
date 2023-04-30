import React from "react";


export default function Box({ color, size, scale, children, ...rest }) {
    return (
        <mesh scale={scale} {...rest}>
            <boxBufferGeometry args={size} />
            <meshPhongMaterial color={color} transparent opacity={0.5} />
            {children}
        </mesh>
    );
}