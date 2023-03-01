import React from 'react'
import { Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const EditContent = () => {
    return (
        <div>

            <section className="content-header">

                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="default_color">Edit Content  </h1>
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

                                <li className="breadcrumb-item active">Edit Content</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content  d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card wrap cddr2">
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-md-6 offset-md-6">
                                        </div>
                                    </div>

                                    <div className="card-body table-responsive">
                                        <div className="form-group">
                                            <label for="inputfName" className="form-label">
                                                Title
                                                <sup className="error">*</sup>
                                            </label>
                                            <input type="text" formcontrolname="title" id="inputfName" placeholder="Content Title" className="form-control ng-pristine ng-valid ng-touched " />
                                        </div>

                                        <label for="inputfName" className="form-label">Content<sup _ngcontent-pvk-c58="" class="error">*</sup></label>

                                        <CKEditor
                                            editor={ClassicEditor}

                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.

                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                console.log({ event, editor, data });
                                            }}
                                            onBlur={(event, editor) => {
                                                console.log('Blur.', editor);
                                            }}
                                            onFocus={(event, editor) => {
                                                console.log('Focus.', editor);
                                            }}
                                        />

                                        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <FadeLoader speedMultiplier={0.5} loading={loading} />
                                        </div> */}

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </section>

        </div>
    )
}

export default EditContent
