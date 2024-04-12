import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Generate array of page numbers to display
  let pageNumbers: number[] = [];
  if (totalPages <= 3) {
    pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    if (currentPage === 1) {
      pageNumbers = [1, 2, 3];
    } else if (currentPage === totalPages) {
      pageNumbers = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageNumbers = [currentPage - 1, currentPage, currentPage + 1];
    }
  }

  return (
    <View style={styles.pagination}>
      {/* Previous button */}
      <TouchableOpacity onPress={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <Text style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}>
          {'<'}
        </Text>
      </TouchableOpacity>
      {/* Page numbers */}
      {pageNumbers.map((page) => (
        <TouchableOpacity key={page} onPress={() => onPageChange(page)}>
          <Text style={[styles.paginationButton, currentPage === page && styles.activeButton]}>
            {page}
          </Text>
        </TouchableOpacity>
      ))}
      {/* Next button */}
      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text
          style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
        >
          {'>'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationButton: {
    fontSize: 16,
    color: 'blue',
    marginHorizontal: 10,
  },
  activeButton: {
    fontWeight: 'bold',
  },
  disabledButton: {
    color: '#ccc',
  },
});

export default Pagination;
