import React, { Component } from 'react';
import axios from 'axios';
import '../css/viewRegSuppliers.css'
class ViewRegSuppliers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            searchQuery: ''
        };
    }

    componentDidMount() {
        this.fetchSuppliers();
    }

    fetchSuppliers = () => {
        axios
            .get('http://localhost:8070/supplier/viewRegSuppliers')
            .then((response) => {
                this.setState({ suppliers: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleRemoveSupplier(id) {
        axios
            .delete(`http://localhost:8070/supplier/delete/${id}`)
            .then((response) => {
                // remove the supplier from the state
                this.setState({
                    suppliers: this.state.suppliers.filter(
                        (supplier) => supplier._id !== id
                    )
                });

                // remove the supplier from the database
                axios
                    .delete(
                        `http://localhost:8070/supplier/deleteRegSupplier/${id}`
                    )
                    .then((response) => {
                        console.log('Supplier removed from database.');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSearchQueryChange = (event) => {
        
        this.setState({ searchQuery: event.target.value });
    };

    handleSearch = () => {
        const { searchQuery } = this.state;
        

        axios
            .get(
                `http://localhost:8070/supplier/searchRegSuppliers?search=${searchQuery}`
            )
            .then((response) => {
                console.log('Search response:', response.data);
                if (response.data.success) {
                    console.log('Search results:', response.data.suppliers);
                    this.setState({ suppliers: response.data.suppliers });
                }
            })
            .catch((error) => {
                
                console.log(error);
            });
    };

    render() {
        const { suppliers, searchQuery } = this.state;

        if (!Array.isArray(suppliers)) {
            return null; // or show a loading spinner, error message, etc.
        }

        return (
            <div id="view-registered-supplier" className='view-registered-supplier'>
                <h2 id="view-registered-supplier-head" className='view-registered-supplier-head'>Registered Suppliers</h2>
                <div id='search-container' className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name or company"
                        value={searchQuery}
                        onChange={this.handleSearchQueryChange}
                    />
                    <button id='view-registered-supplier-search' onClick={this.handleSearch}>Search</button>
                </div>
                <table id="view-registered-supplier-table" className="view-registered-supplier-table">
                    <thead id="view-registered-supplier-table-head" className='view-registered-supplier-table-head'>
                        <tr>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Experience</th>
                            <th>Medicine Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="view-registered-supplier-table-body" className='view-registered-supplier-table-body'>
                        {suppliers.map((supplier, i) => {
                            return (
                                <tr key={i}>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.company}</td>
                                    <td>{supplier.experience}</td>
                                    <td>{supplier.medicine_type}</td>
                                    <td><button
                                            id="view-registered-supplier-remove-button"
                                            onClick={() =>
                                                this.handleRemoveSupplier(
                                                    supplier._id
                                                )
                                            }
                                        >
                                            Remove Supplier
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ViewRegSuppliers;
