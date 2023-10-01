const Filter = ({ filterName, handleFilterChange }) => {
    return (
      <div>
        Filter shown with{' '}
        <input
          value={filterName}
          onChange={handleFilterChange}
        />
      </div>
    );
  };
  
  export default Filter;