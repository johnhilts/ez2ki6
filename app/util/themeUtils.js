export const themes = {dark: {id: 0, name: 't--dark', }, light: {id: 1, name: 't--light', } }
export const defaultThemeId = themes.dark.id;

export const getThemeById  = (themeId) => {
  if (!themeId) {
    return themes.dark.name;
  }

  switch (themeId) {
    case themes.light.id:
      return themes.light.name;
    case themes.dark.id:
    default:
      return themes.dark.name;
  }

}
