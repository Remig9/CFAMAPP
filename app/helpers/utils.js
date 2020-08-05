export const elevationShadowStyle = elevation => {
    return {
      elevation,
      shadowColor: '#0001',
      shadowOffset: {width: 0, height: 0.5 * elevation},
      shadowOpacity: 0.1,
      shadowRadius: 0.2 * elevation,
    };
  };
  export const capitalize = val => val.replace(/\b\w/g, l => l.toUpperCase());
  
  export const cleanInteger = val => val.replace(/\,/g, '');
  