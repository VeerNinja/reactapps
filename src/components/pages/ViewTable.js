import React from 'react';
import './../styles/dist/css/tabler.css';
import { Link } from 'react-router-dom';
import './../styles/dist/css/tabler-flags.css';
import './../styles/dist/css/tabler-payments.css';
import './../styles/dist/css/tabler-vendors.css';
import './../styles/dist/css/demo.css';
import Navbar from './Navbar';
import { ReactComponent as ViewIcon }  from '../../icons/eye-fill.svg';
import "./../styles/css/style.css";

const ViewTable = () => {
  const rows = [
    {
      id:1,
      invoice: "Cedar Point, United States",
      invoice_date: "RMC Hybrid",
      filename: "100.0%",
      date: "August 04, 2021",
      view: 74,
    },
    {
      id: 2,
      invoice: "Carowinds, United States",
      invoice_date: "B&M Giga, Hyper, Steel",
      filename: "99.3%",
      date: "January 03, 2019",
      view: 49,
    },
    {
      id: 3,
      invoice: "Kolmården, Sweden",
      invoice_date: "RMC Twister, Wooden, Terrain",
      filename: "99.3%",
      date: "December 28, 2018",
      view: 8,
    },
    {
      id: 4,
      invoice: "Dollywood, United States",
      invoice_date: "RMC Wooden",
      filename: "99.1%",
      date: "November 07, 2020",
      view: 104,
    },
    // Add more rows as needed
  ];

  return (
    <>
    <Navbar/>
    <div>
      {/* Page Header */}
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">Datatables</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Page Body */}
      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="card-body">
              <div id="table-default" className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th><button className="table-sort" >S.No</button></th>
                      <th><button className="table-sort" >Invoice Number</button></th>
                      <th><button className="table-sort">Invoice Date</button></th>
                      <th><button className="table-sort" >File Name</button></th>
                      <th><button className="table-sort">Uploaded Date</button></th>
                      <th><button className="table-sort" >View</button></th>
                    </tr>
                  </thead>
                  <tbody className="table-tbody">
                    {rows.map((item, index) => (
                      <tr key={index}>
                        <td >{item.id}</td>
                        <td >{item.invoice}</td>
                        <td >{item.invoice_date}</td>
                        <td>{item.filename}</td>
                        <td>{item.date}</td>
                        <td > <Link to={`/view/${item.id}`}>
                          <ViewIcon />
                        </Link></td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default ViewTable;
