const FieldErrorAlert = ({ errors, fieldName }) => {
  if (!errors || !errors[fieldName]) return null;
  return (
    <p className="text-sm text-wrap text-red-500">
      {errors[fieldName]?.message}
    </p>
  );
};

export default FieldErrorAlert;
