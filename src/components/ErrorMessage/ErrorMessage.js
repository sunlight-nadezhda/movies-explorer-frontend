import './ErrorMessage.css';

const ErrorMessage = (props) => {
  return (
    <div className="error-message" style={{ display: `${props.showError ? 'block' : 'none'}`}}>{props.text}</div>
  );
};

export default ErrorMessage;
