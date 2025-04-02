const ColorForm = () => {
  return (
      <form>
        <label htmlFor={'role'}>
          Role
          <input id={'role'} type="text"/>
        </label>
        <label htmlFor={'hex'}>
          Hex
          <input id={'hex'} type="text"/>
        </label>
        <label htmlFor={'contrastText'}>
          Contrast Text
          <input id={'contrastText'} type="text"/>
        </label>
        <button type="submit">
          Add Color
        </button>
      </form>
  );
};
export default ColorForm;