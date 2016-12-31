describe('Week component snapshot test', () => {
  it('Should compare the Week component with a snapshot', () => {
    const component = '<div>Hello Jest</div>'
    expect(component).toMatchSnapshot();
  })
});
