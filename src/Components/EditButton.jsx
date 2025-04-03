
const EditButton = ({setShowEditForm}) => {
  return (
      <button
          onClick={() => setShowEditForm(true)}
      >
        Edit
      </button>
  );
};
export default EditButton;