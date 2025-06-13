'use client'
import { useState, useEffect } from 'react';

export function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Evitar hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Aplicar el tema inmediatamente al montar para evitar flashes
    const savedTheme = localStorage.getItem('theme');
    let shouldBeDark = false;
    
    if (savedTheme === 'dark') {
      shouldBeDark = true;
    } else if (savedTheme === 'light') {
      shouldBeDark = false;
    } else {
      // Sin preferencia guardada, usar sistema
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Aplicar inmediatamente para evitar flash
    setIsDarkMode(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (isDark) => {
    const root = document.documentElement;
    const body = document.body;
    
    // Limpiar clases anteriores
    root.classList.remove('dark-mode', 'light-mode');
    
    if (isDark) {
      root.classList.add('dark-mode');
      body.style.backgroundColor = 'rgb(0, 0, 0)';
      body.style.color = 'rgb(255, 255, 255)';
    } else {
      root.classList.add('light-mode');
      body.style.backgroundColor = 'rgb(255, 255, 255)';
      body.style.color = 'rgb(0, 0, 0)';
    }
  };

  const toggleTheme = (e) => {
    // Prevenir propagación para evitar doble trigger
    e.preventDefault();
    e.stopPropagation();
    
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    
    // Guardar preferencia explícita
    localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
    applyTheme(newIsDarkMode);
  };

  const handleLabelClick = (e) => {
    // Solo manejar el clic del label, no del input
    e.preventDefault();
    e.stopPropagation();
    toggleTheme(e);
  };

  // No renderizar hasta que esté montado para evitar hydration mismatch
  if (!mounted) {
    return (
      <div className="theme-switcher text-xxs flex gap-2 items-center">
        <input type="checkbox" id="switch" checked={false} disabled />
        <label htmlFor="switch"></label>
        <span>Tema</span>
      </div>
    );
  }

  return (
    <div className="theme-switcher text-xxs flex gap-2 items-center">
      <input
        type="checkbox"
        id="switch"
        checked={isDarkMode}
        onChange={toggleTheme}
        aria-label="Alternar entre modo claro y oscuro"
      />
      <label htmlFor="switch" onClick={handleLabelClick}></label>
      <span>{isDarkMode ? 'Oscuro' : 'Claro'}</span>
    </div>
  );
}