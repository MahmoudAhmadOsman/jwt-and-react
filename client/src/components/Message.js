import React from "react";

const allErrorsTypes = (props) => {
  let alertType = "alert ";
  if (props.message.msgError) alertType = alertType + "alert-danger";
  else alertType = alertType + "alert-success";
  return alertType + " text-center";
};

const Message = (props) => {
  return (
    <section className="alert-messages mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={allErrorsTypes(props)} role="alert">
              {props.message.msgBody}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;
