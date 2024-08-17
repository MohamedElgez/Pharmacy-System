

const NotFound = () => {

return(

        <div className="content-wrapper">
          
        <div className="ag-page-404">
            <div className="ag-toaster-wrap">
                <div className="ag-toaster">
                    <div className="ag-toaster_back"></div>
                    <div className="ag-toaster_front">
                        <div className="js-toaster_lever ag-toaster_lever"></div>
                    </div>
                    
                    <div className="ag-toaster_toast-handler">
                        <div className="ag-toaster_shadow"></div>
                        <h1>404</h1>
                        <div className="js-toaster_toast ag-toaster_toast js-ag-hide"></div>
                    </div>
                </div>

                <canvas id="canvas-404" className="ag-canvas-404"></canvas>
                <img className="ag-canvas-404_img"
                    src="https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/404-error-smoke-from-toaster/images/smoke.png"/>
            </div>
        </div>


        </div>
)
  

}
export default NotFound