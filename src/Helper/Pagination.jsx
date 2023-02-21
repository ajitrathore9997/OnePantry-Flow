import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination(props) {
  // console.log(props)

  return (
    <div>
      <div className="col-12 mt-4 d-flex">
        <div
          className="dataTables_info col-4"
          id="example2_info"
          role="status"
          aria-live="polite"
        >
          Showing {props.totaldata ? (props.counting + 1) : (0)} to {props.counting + 10 < props.totaldata
            ? props.counting + 10
            : props.totaldata} of {props.totaldata} entries
        </div>

        <div className="col-8 d-flex justify-content-end ">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            // breakLabel={'...'}
            pageCount={props.pagecount}
            // marginPagesDisplayed={3}
            // pageRangeDisplayed={1}
            onPageChange={props.onChangePage}
            containerClassName={"pagination "}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}
