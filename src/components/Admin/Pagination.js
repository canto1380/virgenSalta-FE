import { Pagination } from "antd";

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

const PaginationAdmin = ({ data, pageSelected, setPageSelected }) => {
  return (
    <div className="menuContainer text-end">
      <Pagination
        defaultCurrent={pageSelected}
        current={pageSelected}
        showSizeChange
        onShowSizeChange={onShowSizeChange}
        defaultPageSize={data.foundRegisters}
        total={data?.totalRegister}
        onChange={(page) => setPageSelected(page)}
      />
      <br />
    </div>
  );
};
export default PaginationAdmin;
