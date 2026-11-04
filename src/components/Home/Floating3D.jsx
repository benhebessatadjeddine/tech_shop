import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei'

function AbstractShape() {
  const meshRef = useRef()
  
  // Rotate slowly over time
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        {/* An abstract Torus Knot geometry */}
        <torusKnotGeometry args={[1.8, 0.5, 128, 32]} />
        <MeshDistortMaterial
          color="#2df8c5"
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          emissive="#2df8c5"
          emissiveIntensity={0.2}
          wireframe={true}
        />
      </mesh>
      
      <mesh position={[-3, 2, -5]} scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#ff0055" 
          emissive="#ff0055"
          emissiveIntensity={0.5}
          wireframe 
        />
      </mesh>
    </Float>
  )
}

export default function Floating3D() {
  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <AbstractShape />
      </Canvas>
    </div>
  )
}
