import React from 'react'
import './Order.css'

const Order = () => {

    const listPackage = [
        {
            id: 1,
            package: "Package 6 months",
            kidName: "Kid 1",
            price: 2760000,
            purchaseDate: "6/1/2024",
            status: "Unexpired",
        },
        {
            id: 2,
            package: "Package 1 months",
            kidName: "Kid 2",
            price: 500000,
            purchaseDate: "4/2/2024",
            status: "Expired",
        },
        {
            id: 3,
            package: "Package 12 months",
            kidName: "Kid 2",
            price: 5400000,
            purchaseDate: "3/18/2023",
            status: "Expired",
        },
        {
            id: 4,
            package: "Package 3 months",
            kidName: "Kid 1",
            price: 1425000,
            purchaseDate: "1/23/2024",
            status: "Expired",
        },
        {
            id: 5,
            package: "Package 6 months",
            kidName: "Kid 1",
            price: 2760000,
            purchaseDate: "5/24/2023",
            status: "Expired",
        },
    ]

    return (
        <div className='order-container'>
            <div className="title">
                <div className="underline">
                    <p className='order-title'>Orders</p>

                    <div className="sort">
                        <p>Sort by: </p>
                        <select className='select-field'>
                            <option value="default">Default</option>
                            <option value="number">Number</option>
                            <option value="package">Package</option>
                            <option value="kidName">Name of kid</option>
                            <option value="price">Price</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="content">
                <table>
                    <tbody>
                        <tr>
                            <td>No.</td>
                            <td>Package</td>
                            <td>Name of kid</td>
                            <td>Price</td>
                            <td>Purchase Date</td>
                            <td>Status</td>
                        </tr>

                        {listPackage.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.package}</td>
                                <td>{item.kidName}</td>
                                <td>{item.price} VNĐ</td>
                                <td>{item.purchaseDate}</td>
                                <td>{item.status}</td>
                                <td className='detail'>
                                    <button>Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Order