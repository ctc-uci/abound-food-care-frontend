import React from 'react';
import PropTypes from 'prop-types';
import styles from './PaginationController.module.css';

const PaginationController = ({ paginatedIndex, setPaginatedIndex, totalNumberOfPages }) => (
  <div className={styles['pagination-indicator']}>
    <div className={styles['left-section']}>
      <button
        className={styles['start-button']}
        type="button"
        onClick={() => {
          setPaginatedIndex(1);
        }}
      >
        {/* <FaAngleDoubleLeft /> */}
        double left
      </button>
    </div>
    <div className={styles['middle-section']}>
      <button
        className={styles['back-button']}
        type="button"
        onClick={() => {
          setPaginatedIndex(Math.max(1, paginatedIndex - 1));
        }}
      >
        {/* <MdArrowBackIos /> */}
      </button>
      <div>Page&nbsp;</div>
      <div>{totalNumberOfPages === 0 ? 0 : paginatedIndex}</div>
      <div>&nbsp;of&nbsp;</div>
      <div>{totalNumberOfPages}</div>
      <button
        className={styles['forward-button']}
        type="button"
        onClick={() => {
          setPaginatedIndex(old => Math.min(totalNumberOfPages, old + 1));
        }}
      >
        {/* <MdArrowForwardIos /> */}
        arrow forward
      </button>
    </div>
    <div className={styles['right-section']}>
      <button
        className={styles['end-button']}
        type="button"
        onClick={() => {
          setPaginatedIndex(totalNumberOfPages);
        }}
      >
        {/* <FaAngleDoubleRight /> */}
        double right
      </button>
    </div>
  </div>
);

PaginationController.propTypes = {
  totalNumberOfPages: PropTypes.number.isRequired,
  paginatedIndex: PropTypes.number.isRequired,
  setPaginatedIndex: PropTypes.func.isRequired,
};

export default PaginationController;
