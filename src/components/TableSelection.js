function TableSelection({ setTable }) {
  return (
    <div className="d-flex align-items-center">
      <label className="me-2 fw-medium">Select Table:</label>
      <select
        className="form-select w-auto"
        onChange={(e) => setTable(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select</option>
        <option value="Table 1">Table 1</option>
        <option value="Table 2">Table 2</option>
        <option value="Table 3">Table 3</option>
        <option value="Table 4">Table 4</option>
        <option value="Table 5">Table 5</option>
      </select>
    </div>
  );
}
export default TableSelection;
