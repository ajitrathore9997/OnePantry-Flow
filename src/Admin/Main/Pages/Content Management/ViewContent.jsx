import React from 'react'
import { Link } from 'react-router-dom'

const ViewContent = () => {
    return (
        <div>
            <section className="content-header">

                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="default_color">Content List</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <Link
                                    to="/panel/dashboard"
                                    className="breadcrumb-item"
                                    style={{ textDecoration: "none" }}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/panel/content"
                                    className="breadcrumb-item"
                                    style={{ textDecoration: "none" }}
                                >
                                    Content's List
                                </Link>

                                <li className="breadcrumb-item active">View Content</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-fluid p-2">
                <div className="card p-3">
                    <div className="row">
                        <div >
                            <div className="mt-3">
                                <div >
                                    <h5 className="form-label text-center">
                                    Terms and conditions
                                    </h5>
                                </div>
                                <div className="container">
                                    <div >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellat fuga assumenda sit officiis voluptas natus esse harum nihil magni omnis quis odio maxime commodi iusto ea odit doloribus quod, vitae ipsum. Commodi corporis rem saepe ad soluta impedit repellat, fugit a.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ViewContent
