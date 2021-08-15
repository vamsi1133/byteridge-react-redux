import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions";

function AuditPage(props) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.getAuditUsers(page);
  }, [page]);

  const dateFormatter = (UTCdate) => {
    const date = new Date(UTCdate);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds =
      date.getMinutes() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    return `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()} at ${hours}:${minutes}:${seconds}`;
  };

  const AuditorDahboard = () => (
    <div>
      <h5>name: {props.user.firstName.toUpperCase()}</h5>
      <h5>Role: {props.user.role.toUpperCase()}</h5>
      <hr />
      <button
        onClick={() =>
          setPage((prev) => {
            if (prev > 1) {
              return prev - 1;
            } else return Math.ceil(props.users.count / 10) - 1;
          })
        }
      >
        Prev
      </button>
      <button
        onClick={() =>
          setPage((prev) => {
            const lastPage = Math.ceil(props.users.count / 10);
            if (prev < lastPage - 1) {
              return prev + 1;
            } else {
              return 0;
            }
          })
        }
      >
        Next
      </button>
      <br />
      <span>page: {page + 1} </span>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">SNo</th>
            <th scope="col">user</th>
            <th scope="col">login time</th>
            <th scope="col">logout time</th>
            <th scope="col">Client IP</th>
          </tr>
        </thead>
        <tbody>
          {props.users.items &&
            props.users.items.map((data, index) => {
              return (
                <tr>
                  <td scope="row">{index + 1 + page * 10}</td>
                  <td>{data.firstName}</td>
                  <td>
                    {data.loginTime ? dateFormatter(data.loginTime) : "NA"}
                  </td>
                  <td>
                    {data.logoutTime ? dateFormatter(data.logoutTime) : "NA"}
                  </td>
                  <td>{data.clientIP || "NA"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

  return props.user ? <AuditorDahboard /> : <h2>Unauthorizes Access</h2>;
}

function mapState(state) {
  const { authentication, users } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getAuditUsers: userActions.getAuditUsers,
};

export default connect(mapState, actionCreators)(AuditPage);
