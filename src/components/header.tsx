import * as React from "react";
import { AlgoEnum } from "../enums/algoEnums";
import ReactTooltip from "react-tooltip";
import { HeaderConfig } from "../models/headerConfig";
import header_logo from "../assets/header_logo.png";

export interface HeaderProps {
  onActivate: any;
  onChange: Function;
  algorithms: AlgoEnum[];
  selectedAlgo: AlgoEnum;
  onSpeedChange: Function;
  onRefresh: Function;
  config: HeaderConfig;
}

class Header extends React.Component<HeaderProps, {}> {
  handleChange = (option: string) => {
    this.props.onChange(option);
  };
  render() {
    const {
      selectedAlgo,
      algorithms,
      onActivate,
      onSpeedChange,
      onChange,
      onRefresh,
      config,
    } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand d-flex">
          <img
            height="32"
            width="32"
            className="mr-2"
            alt="header_logo"
            src={header_logo}
          />
          <div>Sorting Visualiser</div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <form>
            <div className="form-group d-flex m-2">
              <label
                htmlFor="formControlRange"
                className="m-0 mr-2"
                style={{ color: "white" }}
              >
                Change Array Size & Sorting Speed
              </label>
              <input
                disabled={config.disableSlider}
                min={5}
                max={60}
                type="range"
                className="range action-link"
                id="formControlRange"
                onChange={(e) => onSpeedChange(e)}
              />
            </div>
          </form>

          <button
            className="btn btn-secondary m-2"
            disabled={config.disableRefresh}
            onClick={() => onRefresh()}
          >
            Refresh Array
          </button>
          <button
            className={
              "btn m-2 " +
              (selectedAlgo !== AlgoEnum.None ? "btn-success" : "btn-secondary")
            }
            onClick={!config.alreadySortedPromt && onActivate}
            data-tip={
              config.alreadySortedPromt
                ? "Please Refresh Array!"
                : "Select Algorithm first!"
            }
            data-place="bottom"
            data-tip-disable={
              selectedAlgo !== AlgoEnum.None && !config.alreadySortedPromt
            }
            disabled={config.disableActivate}
          >
            Activate
          </button>
          <ReactTooltip />

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div className="dropdown m-2">
                <button
                  className="btn btn-secondary dropdown-toggle mr-4"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  disabled={config.disableSelectAlgo}
                >
                  {selectedAlgo === AlgoEnum.None
                    ? "Select Algorithm"
                    : selectedAlgo}
                </button>
                <div
                  className="dropdown-menu action-link"
                  aria-labelledby="dropdownMenuButton"
                >
                  {algorithms.map((algo) => (
                    <div
                      key={algo}
                      onClick={() => onChange(algo)}
                      className="dropdown-item"
                    >
                      {algo}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
