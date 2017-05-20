import * as themeUtils from '../../app/util/themeUtils';

describe('theme', () => {
  it('returns dark for default themeId', () => {
    let themeId = themeUtils.defaultThemeId;
    let expected = themeUtils.themes.dark.name;
    let actual = themeUtils.getThemeById(themeId);
    expect(expected).toEqual(actual);
  });

  it('returns dark for undefined themeId', () => {
    let themeId;
    let expected = themeUtils.themes.dark.name;
    let actual = themeUtils.getThemeById(themeId);
    expect(expected).toEqual(actual);
  });

  it('returns dark for dark themeId', () => {
    let themeId = themeUtils.themes.dark.id;
    let expected = themeUtils.themes.dark.name;
    let actual = themeUtils.getThemeById(themeId);
    expect(expected).toEqual(actual);
  });

  it('returns light for light themeId', () => {
    let themeId = themeUtils.themes.light.id;
    let expected = themeUtils.themes.light.name;
    let actual = themeUtils.getThemeById(themeId);
    expect(expected).toEqual(actual);
  });
})
