import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
//import { GrCreditCard } from "react-icons/gr";
import {
  FaCcVisa,
  FaCcMastercard,
  SiAmericanexpress,
  GrCreditCard,
  GiConfirmed,
} from "react-icons/all";
import { COLORS } from "../GlobalStyles";
import { ModalContext } from "./context";

const CheckoutModal = () => {
  const [confirmPage, setConfirmPage] = useState(false);

  const [userInfo, setUserInfo] = useState({
    lastName: "",
    firstName: "",
    email: "",
  });
  const [confirmationId, setConfirmationId] = useState({
    email: false,
    fname: false,
    lname: false,
    crc: false,
    creditCard: false,
  });

  //this is the part that uses the put method to remove the number of items

  let items = [];
  //
  //   useEffect(() => {
  //     if (
  //       items.length > 0 &&
  //       Object.values(confirmationId).every((v) => v === true)
  //     ) {
  //       items.map((item) => {
  //         fetch("/purchase", {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             data: [
  //               {
  //                 _id: `${item._id}`,
  //                 quantity: `${item.quantity}`,
  //               },
  //             ],
  //           }),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => console.log("this is the data", data));
  //       });
  //     }
  //     console.log("these are teh items", items);
  //   }, [items]);

  return (
    <ModalContext.Consumer>
      {(context) => {
        if (context?.showModal) {
          return (
            <BackGround>
              <CheckOut>
                {/*this will check if the buy button is true and will then load up the 
                confirmation page
                */}
                {!confirmPage && (
                  <>
                    <Items>
                      <Summary>Order Summary:</Summary>
                      <ItemContainer>
                        <ItemTags>
                          <strong>&emsp; &emsp; &emsp; Item</strong>
                          <strong>
                            Price&emsp; &emsp; &emsp;QTY&emsp; Sub-Total
                          </strong>
                        </ItemTags>
                        {context.storeItems.map((item) => {
                          items.push(item);
                          return (
                            <Item>
                              {/* {setItems({ ...items, item })} */}
                              <Img src={item.imageSrc} />
                              <ItemName> {item.name} </ItemName>
                              <p> {item.price} </p>
                              <p> {item.quantity} </p>
                              <p>
                                $
                                {(
                                  Number(item.price.split("$")[1]) *
                                  item.quantity
                                ).toFixed(2)}
                              </p>
                            </Item>
                          );
                        })}{" "}
                      </ItemContainer>
                      <Bottom>
                        <strong>We accept:</strong>
                        <Cards>
                          <FaCcVisa />
                          <FaCcMastercard />
                          <SiAmericanexpress />
                        </Cards>
                      </Bottom>
                    </Items>
                    <Form
                      onSubmit={(ev) => {
                        ev.preventDefault();
                      }}
                    >
                      <H1>
                        Payment Information <GrCreditCard />{" "}
                      </H1>
                      <Fname>
                        <label for="fname">First Name: </label>
                        <FnameInput
                          id="fname"
                          type="text"
                          name="fname"
                          onChange={(ev) => {
                            setConfirmationId({
                              ...confirmationId,
                              fname: ev.target.validity.valid,
                            });
                            setUserInfo({
                              ...userInfo,
                              firstName: ev.target.value,
                            });
                          }}
                          required
                        />
                      </Fname>
                      <Lname>
                        Last Name:{" "}
                        <LnameInput
                          onChange={(ev) => {
                            setConfirmationId({
                              ...confirmationId,
                              lname: ev.target.validity.valid,
                            });
                            setUserInfo({
                              ...userInfo,
                              lastName: ev.target.value,
                            });
                          }}
                          required
                        />
                      </Lname>
                      <Email>
                        Email:{" "}
                        <EmailInput
                          type="email"
                          id="email"
                          onChange={(ev) => {
                            setConfirmationId({
                              ...confirmationId,
                              email: ev.target.validity.valid,
                            });
                            if (ev.target.validity.valid) {
                              setUserInfo({
                                ...userInfo,
                                ["email"]: ev.target.value,
                              });
                              return true;
                            } else {
                              setUserInfo({
                                ...userInfo,
                                ["email"]: ev.target.value,
                              });
                            }
                          }}
                          required
                        />
                      </Email>
                      <CreditCard>
                        Credit Card:{" "}
                        <CreditInput
                          input="number"
                          minLength="16"
                          maxLength="16"
                          onChange={(ev) => {
                            if (
                              ev.target.value.length === 16 &&
                              Number(ev.target.value)
                            ) {
                              setUserInfo({
                                ...userInfo,
                                CreditCard: ev.target.value,
                              });
                              setConfirmationId({
                                ...confirmationId,
                                creditCard: ev.target.validity.valid,
                              });
                            } else {
                              setConfirmationId({
                                ...confirmationId,
                                creditCard: false,
                              });
                            }
                          }}
                          required
                        />
                      </CreditCard>
                      <Crc>
                        crc:{" "}
                        <CrcInput
                          input="number"
                          minLength="3"
                          maxLength="3"
                          onChange={(ev) => {
                            if (
                              ev.target.value.length === 3 &&
                              Number(ev.target.value)
                            ) {
                              setUserInfo({
                                ...userInfo,
                                Crc: ev.target.value,
                              });
                              setConfirmationId({
                                ...confirmationId,
                                crc: ev.target.validity.valid,
                              });
                            } else {
                              setConfirmationId({
                                ...confirmationId,
                                crc: false,
                              });
                            }
                          }}
                          required
                        />
                      </Crc>
                      <strong>Total: </strong>${context.total.toFixed(2)}
                      <SubmitBtn
                        id="buy"
                        name="buy"
                        type="button"
                        validInputs={Object.values(confirmationId).every(
                          (v) => v === true
                        )}
                        disabled={
                          !Object.values(confirmationId).every(
                            (v) => v === true
                          )
                        }
                        onClick={() => setConfirmPage(!confirmPage)}
                      >
                        Confirm
                      </SubmitBtn>
                    </Form>
                    <CancelBtn type="button" onClick={context.toggleModal}>
                      X
                    </CancelBtn>
                  </>
                )}
                {/*The confirmation page will load up since confirmation page is set to be true then */}
                {confirmPage && (
                  <Hello confirmPage={confirmPage}>
                    <ConfirmationInfo>
                      <Span>
                        {" "}
                        <GiConfirmed />{" "}
                      </Span>
                      <p>
                        Thanks for shopping with us{" "}
                        <strong>
                          {userInfo.firstName} {userInfo.lastName}
                        </strong>
                      </p>
                      <p>
                        A confirmation email has been sent to you at the
                        following email <strong>{userInfo.email}</strong>
                      </p>
                      <ResetBtn
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        <Link to="/">Continue Shopping ⟹</Link>
                      </ResetBtn>
                    </ConfirmationInfo>
                  </Hello>
                )}
              </CheckOut>
            </BackGround>
          );
        }
      }}
    </ModalContext.Consumer>
  );
};

const ResetBtn = styled.button`
  height: 50px;
  background-color: ${COLORS.accent};
  text-decoration: none;
  border: none;
  border-radius: 15px;
  padding: 5px 8px;
  font-size: 30px;
  color: ${COLORS.secondary};
  margin-top: 15px;
`;

const ConfirmationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75vw;
  height: 100%;
  line-height: 2.8;
`;

const Span = styled.span`
  font-size: 55px;
  font-weight: 900;
  color: green;
`;
const CancelBtn = styled.button`
  width: 40px;
  height: 40px;
  font-size: 20px;
  text-decoration: none;
  background-color: ${COLORS.accent};
  border: none;
`;

const SubmitBtn = styled.button`
  //background-color: ${(props) => (props.validInputs ? "white" : "grey")};
  background-color: ${(props) => (props.validInputs ? "#fca311" : "grey")};
  cursor: pointer;
`;

const EmailInput = styled.input`
  width: 250px;
`;
const FnameInput = styled.input`
  width: 150px;
`;
const LnameInput = styled.input`
  width: 150px;
`;
const CrcInput = styled.input`
  width: 50px;
`;
const CreditInput = styled.input`
  width: 220px;
`;

const Email = styled.div``;
const Crc = styled.div``;
const Lname = styled.div``;
const Fname = styled.div``;
const CreditCard = styled.div``;

const ItemTags = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  left: 0%;
  margin-bottom: 20px;
  /* font-weight: 700; */
`;

const ItemName = styled.p`
  width: 45%;
`;

const Img = styled.img`
  width: 75px;
  height: 75px;
`;

const Hello = styled.p`
  display: ${(props) => (props.confirmPage ? "block" : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 2%;
  width: 35%;
  border-left: 2px solid ${COLORS.accent};
  height: 100%;
  * {
    margin: 10px 0;
  }
`;

const BackGround = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  color: black;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10;
  padding-top: 100px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${COLORS.accent};
`;

const Items = styled.div`
  overflow: auto;
  width: 65%;
  height: 100%;
`;

const CheckOut = styled.div`
  background-color: ${COLORS.grayBG};
  display: flex;
  width: 75vw;
  height: 75vh;
`;

const H1 = styled.h1`
  /* font-family: "Lato", sans-serif;
  width: fit-content; */
  color: ${COLORS.secondary};
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  width: 90%;
`;
const Summary = styled.h1`
  margin: 20px auto;
  width: 95%;
  color: ${COLORS.secondary};
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  width: 95%;
  /* align-items: center; */
  /* border: 1px solid yellow; */
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10% 20px 10%;
  color: ${COLORS.secondary};
`;
const Cards = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 2em;
  padding-top: 15px;
  width: 50%;
`;
export default CheckoutModal;
