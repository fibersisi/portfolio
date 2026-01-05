
import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 uColorArt;
uniform vec3 uColorDesign;
uniform float uHoverArt;
uniform float uHoverDesign;
uniform sampler2D uEarthTexture;
uniform sampler2D uTextTexture;
uniform float uTextureOpacity;

#define PI 3.14159265359

void main() {
    // 采样地球纹理
    vec4 earthColor = texture2D(uEarthTexture, vUv);
    
    // 采样文字纹理
    vec4 textColor = texture2D(uTextTexture, vUv);
    
    // 太极图案逻辑
    vec3 pos = normalize(vPosition); 
    float x = pos.x;
    float y = pos.y;
    
    float mask = 0.0; // 0 = Art, 1 = Design
    
    // 太极图案
    if (x > 0.0) mask = 1.0;
    
    float r1 = length(vec2(x, y - 0.5));
    if (r1 < 0.5) mask = 1.0;
    
    float r2 = length(vec2(x, y + 0.5));
    if (r2 < 0.5) mask = 0.0;
    
    if (length(vec2(x, y - 0.5)) < 0.12) mask = 0.0;
    if (length(vec2(x, y + 0.5)) < 0.12) mask = 1.0;
    
    // 太极颜色
    vec3 colArt = uColorArt;
    vec3 colDesign = uColorDesign;
    
    if (mask < 0.5) {
        colArt += uHoverArt * 0.2;
    } else {
        colDesign -= uHoverDesign * 0.2;
    }
    
    vec3 taichiColor = mix(colArt, colDesign, mask);
    
    // 混合地球纹理和太极图案
    vec3 enhancedEarthColor = earthColor.rgb * 1.5;
    vec3 finalColor = mix(taichiColor, enhancedEarthColor, uTextureOpacity);
    
    // 叠加文字纹理
    finalColor = mix(finalColor, textColor.rgb, textColor.a * 0.8);
    
    // Fresnel 边缘光效果
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);
    finalColor += fresnel * 0.2;

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface TaiChiSphereProps {
    onHoverArt: (hover: boolean) => void;
    onHoverDesign: (hover: boolean) => void;
    onClickArt: () => void;
    onClickDesign: () => void;
}

export const TaiChiSphere = ({ onHoverArt, onHoverDesign, onClickArt, onClickDesign }: TaiChiSphereProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);
    const [textTexture, setTextTexture] = useState<THREE.Texture | null>(null);

    // 创建文字纹理 "ART & DESIGN"
    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#6CBFCD';
            ctx.font = 'bold 100px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // 沿着球体赤道位置环绕显示，像大气层效果
            // ART 在左侧 (约 1/4 位置)
            // ctx.fillText('ART', canvas.width * 0.15, canvas.height * 0.5);

            // DESIGN 在右侧 (约 3/4 位置)
            // ctx.fillText('DESIGN', canvas.width * 0.85, canvas.height * 0.5);

            ctx.fillText(' ', canvas.width * 0.85, canvas.height * 0.5);

            // 在中间位置添加分隔符 "&"
            //ctx.font = 'bold 80px Arial, sans-serif';
            //ctx.fillText('&', canvas.width * 0.5, canvas.height * 0.5);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            setTextTexture(texture);
            console.log('✅ 文字纹理创建成功 - 沿着赤道环绕显示');
        }
    }, []);

    // 异步加载地球纹理
    useEffect(() => {
        console.log('=== 开始加载地球图片 ===');
        console.log('图片路径: assets/images/earth_atmos_2048.jpg');
        console.log('完整URL:', window.location.origin + 'assets/images/earth_atmos_2048.jpg');

        // 使用Image对象先加载图片
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            console.log('✅ 图片加载成功!');
            console.log('- 图片尺寸:', img.width, 'x', img.height);
            console.log('- img.complete:', img.complete);
            console.log('- img.naturalWidth:', img.naturalWidth);

            // 图片加载完成后，创建Canvas并绘制
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                console.log('✅ Canvas context 创建成功');
                ctx.drawImage(img, 0, 0);
                console.log('✅ 图片已绘制到Canvas');

                // 获取像素数据验证
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                console.log('Canvas完整像素数据获取成功');
                console.log('- 数据长度:', imageData.data.length);
                console.log('- 示例像素(100,100):', 'R:', imageData.data[400], 'G:', imageData.data[401], 'B:', imageData.data[402]);

                // 使用DataTexture而不是CanvasTexture
                const texture = new THREE.DataTexture(
                    imageData.data,
                    canvas.width,
                    canvas.height,
                    THREE.RGBAFormat,
                    THREE.UnsignedByteType
                );
                texture.needsUpdate = true;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.flipY = true; // 翻转Y轴

                console.log('✅ DataTexture 创建成功');
                console.log('- texture.uuid:', texture.uuid);
                console.log('- texture.image.width:', texture.image.width);
                console.log('- texture.image.height:', texture.image.height);

                setEarthTexture(texture);
                console.log('✅ setEarthTexture 已调用');
            } else {
                console.error('❌ Canvas context 创建失败');
            }
        };

        img.onerror = (error) => {
            console.error('❌ 图片加载失败!');
            console.error('错误:', error);
            console.error('尝试的路径:', img.src);
        };

        const imgSrc = 'assets/images/earth_atmos_2048.jpg';
        console.log('设置 img.src =', imgSrc);
        img.src = imgSrc;
    }, []);

    // Colors
    const colorArt = new THREE.Color("#9C1200");
    const colorDesign = new THREE.Color("#E0E0E0");

    useFrame((_state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2; // Slow rotation
        }

        // Update hover uniforms if we had them animated, 
        // but simple toggle via props might be handled by parent state passed down?
        // Let's add uniforms updates here if needed.
    });

    // Handling Interaction
    // We need to determine which "part" of the sphere was hit.
    // We can do this in the onPointerMove event by checking UVs or local point.

    const handlePointerMove = (e: any) => {
        // e.point is world point
        // Convert to local point
        if (!meshRef.current) return;
        const localPoint = meshRef.current.worldToLocal(e.point.clone());
        const normalized = localPoint.normalize();

        const x = normalized.x;
        const y = normalized.y;

        // Replicate Shader Logic for hit testing
        // Need to match the rotation? wait, worldToLocal handles rotation traverse
        // But if the mesh is rotating in useFrame, the LOCAL coordinate system rotates with it.
        // So the "Pattern" is fixed to the mesh. This is correct.

        let isDesign = false;
        if (x > 0) isDesign = true;

        if (length2(x, y - 0.5) < 0.5) isDesign = true;
        if (length2(x, y + 0.5) < 0.5) isDesign = false;
        if (length2(x, y - 0.5) < 0.12) isDesign = false;
        if (length2(x, y + 0.5) < 0.12) isDesign = true;

        if (isDesign) {
            onHoverDesign(true);
            onHoverArt(false);
            // Update cursor?
            document.body.style.cursor = 'pointer';
        } else {
            onHoverArt(true);
            onHoverDesign(false);
            document.body.style.cursor = 'pointer';
        }
    };

    const handlePointerOut = () => {
        onHoverArt(false);
        onHoverDesign(false);
        document.body.style.cursor = 'auto';
    };

    const handleClick = (e: any) => {
        if (!meshRef.current) return;
        const localPoint = meshRef.current.worldToLocal(e.point.clone());
        const normalized = localPoint.normalize();
        const x = normalized.x;
        const y = normalized.y;

        let isDesign = false;
        if (x > 0) isDesign = true;
        if (length2(x, y - 0.5) < 0.5) isDesign = true;
        if (length2(x, y + 0.5) < 0.5) isDesign = false;
        if (length2(x, y - 0.5) < 0.12) isDesign = false;
        if (length2(x, y + 0.5) < 0.12) isDesign = true;

        if (isDesign) {
            onClickDesign();
        } else {
            onClickArt();
        }
    };

    const length2 = (x: number, y: number) => Math.sqrt(x * x + y * y);

    const uniforms = useMemo(() => {
        console.log('uniforms 更新, earthTexture 存在:', earthTexture !== null);
        console.log('uniforms 更新, textTexture 存在:', textTexture !== null);
        if (!earthTexture) {
            console.log('⚠️ earthTexture 为 null，返回默认uniforms');
        }
        return {
            uColorArt: { value: colorArt },
            uColorDesign: { value: colorDesign },
            uHoverArt: { value: 0 },
            uHoverDesign: { value: 0 },
            uEarthTexture: { value: earthTexture || new THREE.Texture() },
            uTextTexture: { value: textTexture || new THREE.Texture() },
            uTextureOpacity: { value: earthTexture ? 0.85 : 0 }
        };
    }, [earthTexture, textTexture]);

    // 如果纹理未加载，不渲染
    if (!earthTexture) {
        console.log('等待纹理加载...');
        return null;
    }

    // We can also update uniforms based on hover props if we want visual feedback in shader
    // (requires passing 'active' state in props)

    return (
        <mesh
            ref={meshRef}
            onPointerMove={handlePointerMove}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
            scale={[2, 2, 2]} // Size of the sphere
        >
            <sphereGeometry args={[0.7, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};
