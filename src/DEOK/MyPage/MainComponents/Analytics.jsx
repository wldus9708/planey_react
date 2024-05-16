import React, { useState } from "react";
import './Analytics.css'

const Analytics = () => {

    const [orders] = useState([
        {
            productName: 'JavaScript Tutorial',
            productNumber: '85743',
            paymentStatus: 'Due',
            status: 'Pending'
        },
        {
            productName: 'CSS Full Course',
            productNumber: '97245',
            paymentStatus: 'Refunded',
            status: 'Declined'
        },
        {
            productName: 'Flex-Box Tutorial',
            productNumber: '36452',
            paymentStatus: 'Paid',
            status: 'Active'
        },
    ]);

    return (
        <>
            <h1>매장 분석</h1>
            {/* <!-- Analyses --> */}
            <div className="DEOK_MP_CL_analyse">
                <div className="sales">
                    <div className="status">
                        <div className="info">
                            <h3>Total Sales</h3>
                            <h1>$65,024</h1>
                        </div>
                        <div className="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="percentage">
                                <p>+81%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="visits">
                    <div className="status">
                        <div className="info">
                            <h3>Site Visit</h3>
                            <h1>24,981</h1>
                        </div>
                        <div className="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="percentage">
                                <p>-48%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="searches">
                    <div className="status">
                        <div className="info">
                            <h3>Searches</h3>
                            <h1>14,147</h1>
                        </div>
                        <div className="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="percentage">
                                <p>+21%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End of Analyses --> */}

            {/* <!-- New Users Section --> */}
            <div className="new-users">
                <h2>New Users</h2>
                <div className="user-list">
                    <div className="user">
                        <img src="images/profile-2.jpg" alt="" />
                        <h2>Jack</h2>
                        <p>54 Min Ago</p>
                    </div>
                    <div className="user">
                        <img src="images/profile-3.jpg" alt="" />
                        <h2>Amir</h2>
                        <p>3 Hours Ago</p>
                    </div>
                    <div className="user">
                        <img src="images/profile-4.jpg" alt="" />
                        <h2>Ember</h2>
                        <p>6 Hours Ago</p>
                    </div>
                    <div className="user">
                        <img src="images/plus.png" alt="" />
                        <h2>More</h2>
                        <p>New User</p>
                    </div>
                </div>
            </div>
            {/* <!-- End of New Users Section --> */}

            {/* <!-- Recent Orders Table --> */}
            <div className="recent-orders">
                <h2>Recent Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Course Number</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.productNumber}>
                                <td>{order.productName}</td>
                                <td>{order.productNumber}</td>
                                <td>{order.paymentStatus}</td>
                                <td className={order.status === 'Declined' ? 'DEOK_MP_CL_danger' : order.status === 'Pending' ? 'DEOK_MP_CL_warning' : 'DEOK_MP_CL_primary'}>{order.status}</td>
                                <td className="primary">Details</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <!-- End of Recent Orders -->  */}
            
        </>
    )
}

export default Analytics;