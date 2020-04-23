import React, { useState, useEffect, useRef, Component } from "react";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { Map, GoogleApiWrapper } from "google-maps-react";
import "./App.css";
import styled from "styled-components";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Location from "./Location";

import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

//Default Coordinates
const default_longitude = -122.4194;
const default_latitude = 37.7749;

import { MDBCol, MDBInput } from "mdbreact";
const Button = styled.button``;

const mapStyles = {
  width: "100%",
  height: "100%"
};

const App = () => {
  const [target, setTarget] = useState(null);
  const [dropdownOpen, setOpen] = useState(false);
  const [mapCollection, setMapCollection] = useState([]);

  const toggle = () => setOpen(!dropdownOpen);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("view");

  const locateUser = {
    //Locate user button 
    position: "topright",
    strings: {
      title: "Go to location"
    },
    onActivate: () => {}
  };

  //  const target = useRef(null);
  const ref = useRef(null);

  const handleClick = event => {
    setShow(!show);
    setTarget(event.target);
  };
  
  const handleMapClick = click => {
    //User can choose any five points on the map
    if (mapCollection.length <= 4) {
      const updatedMapCollection = mapCollection;
      updatedMapCollection.push([click.latlng.lat, click.latlng.lng]);
      setMapCollection(updatedMapCollection);
      alert(mapCollection);
    } else {
      alert("5 points already chosen");
    }
  };
  
  const handleSearchLocation = input => {};
  //Just a placeholder for search button 
  
  return (
    <Container>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Voter App</h1>
        </header>

        <p className="App-intro">Main page of the app</p>
        <>
          <Row>
            <MDBCol md="8">
              <input
                className="form-control"
                type="text"
                placeholder="Search by Location"
                aria-label="Search location"
              />
            </MDBCol>
            <button
              onClick={handleClick}
              margin-right="40px"
              variant="Search on the Map"
            >
              Select location on the Map
            </button>{" "}
            <button
              onClick={() => {
                setMode("filter");
              }}
              margin-left="400px"
              variant="Search by Filters:"
            >
              {" "}
              Search by Filters{" "}
            </button>{" "}
          </Row>

          {mode === "filter" && (
            <Row margin-top="100px">
              <Col sm={{ size: "auto", offset: 8 }}>
                <ListGroup>
                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>Party Affiliation</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Democrat</DropdownItem>
                      <DropdownItem>Republican</DropdownItem>
                      <DropdownItem>Independent</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>Registration Status</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem> Registered </DropdownItem>
                      <DropdownItem>Not Registered </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>Age Range</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem> 18-25 </DropdownItem>
                      <DropdownItem> 25-35 </DropdownItem>
                      <DropdownItem> 35-50 </DropdownItem>
                      <DropdownItem> 50-70 </DropdownItem>
                      <DropdownItem> 70-90 </DropdownItem>
                      <DropdownItem> 90+ </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret> Race </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        {" "}
                        American Indian or Alaska Native{" "}
                      </DropdownItem>
                      <DropdownItem> Asian </DropdownItem>
                      <DropdownItem> Black or African American </DropdownItem>
                      <DropdownItem> Hispanic or Latino </DropdownItem>
                      <DropdownItem>
                        {" "}
                        Native Hawaiian or Other Pacific Islander{" "}
                      </DropdownItem>
                      <DropdownItem> White </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>

                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                      {" "}
                      Socioeconomic status{" "}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem> Low </DropdownItem>
                      <DropdownItem> Medium </DropdownItem>
                      <DropdownItem> High </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ListGroup>
              </Col>
            </Row>
          )}
        </>
        <textarea
          type="text"
          size="45"
          position="left"
          placeholder="Search location..."
          onClick={event => handleSearchLocation(event.target.value)}
        />
      <Map
        center={[default_latitude, default_longitude]}
        zoom={12}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Location options={locateUser} />
      </Map>
      </div>
    </Container>
  );
};

export default App;
