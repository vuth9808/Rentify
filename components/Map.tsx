'use client';

import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: {
    lat: number;
    lng: number;
    title?: string;
  }[];
  onClick?: (e: mapboxgl.MapMouseEvent) => void;
}

const Map: React.FC<MapProps> = ({
  center = { lat: 10.762622, lng: 106.660172 }, // Mặc định là TP.HCM
  zoom = 12,
  markers = [],
  onClick
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [center.lng, center.lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    if (onClick) {
      map.current.on('click', onClick);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom, onClick]);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Xóa tất cả markers cũ
    const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
    Array.from(existingMarkers).forEach(marker => marker.remove());

    // Thêm markers mới
    markers.forEach((marker: { lat: number; lng: number; title?: string }) => {
      new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new mapboxgl.Popup().setHTML(marker.title || ''))
        .addTo(map.current!);
    });
  }, [markers, mapLoaded]);

  return (
    <div className="h-[400px] w-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Map; 