import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../helpers/utils';

function Table(props) { // eslint-disable-line require-jsdoc
  const { theadList, tbodyList } = props;
  if (!(tbodyList && tbodyList.length)) return null;
  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row">
          {
            theadList.map((th) => {
              return <th className="table__cell table__cell_th" key={th.id}>{th.label}</th>;
            })
          }
        </tr>
      </thead>
      <tbody className="table__body">
        {
          tbodyList.map((tbody) => {
            const content = tbody.content;
            return (
              <tr className="table__row" key={tbody.id}>
                {
                  content.map((td) => {
                    return (<td className="table__cell" key={utils.generateUniqKey(tbody.id)}>{td}</td>);
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

Table.propTypes = {
  theadList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.any,
  })),
  tbodyList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.array,
  })),
};

export default Table;
