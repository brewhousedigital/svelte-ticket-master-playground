<script>
    //import swal from "sweetalert";
    import {getFutureDate} from "$lib/functions/getFutureDate.js";
    import {coinToss} from "$lib/functions/coinToss.js";
    import {randomNumberBetween} from "$lib/functions/randomNumberBetween.js";
    import {completeSimulation} from "$lib/functions/completeSimulation.js";
    import {onMount, onDestroy} from "svelte";
    import {user} from "$lib/store.js";

    import LayoutBuilder from "$lib/components/LayoutBuilder.svelte";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import {createFatalError} from "$lib/functions/hardCrash.js";

    let checkSite = $page.url.hostname;

    let parkingSpotsChosen1 = 0;
    let parkingSpotsChosen2 = 0;

    function handleParkingDown1() {
        if(parkingSpotsChosen1 < 1) {
            parkingSpotsChosen1 = 0;
        } else {
            parkingSpotsChosen1 = parkingSpotsChosen1 - 1;
        }
    }
    function handleParkingUp1() {
        parkingSpotsChosen1 = parkingSpotsChosen1 + 1;
    }
    function handleParkingDown2() {
        if(parkingSpotsChosen2 < 1) {
            parkingSpotsChosen2 = 0;
        } else {
            parkingSpotsChosen2 = parkingSpotsChosen2 - 1;
        }
    }
    function handleParkingUp2() {
        parkingSpotsChosen2 = parkingSpotsChosen2 + 1;
    }

    let ticketProtection;
    let agreeToTerms = false;

    let setTimeoutHandleCheckout;

    onMount(() => {
        if(!$user.email) {
            goto("/sign-in")
        }
    })

    onDestroy(() => {
        clearTimeout(setTimeoutHandleCheckout);
    })

    function handleCheckout() {
        if(!agreeToTerms) {
            swal("Error", "Please agree to the Terms of Use", "error", {
                closeOnClickOutside: false
            })

            return false;
        }

        if(!ticketProtection) {
            swal("Error", "Please choose ticket insurance", "error", {
                closeOnClickOutside: false
            })

            return false;
        }

        swal("Just a Moment", "We're processing your order", "info", {
            closeOnClickOutside: false,
            button: false,
        });

        let counter = randomNumberBetween(60) * 1000;

        if(checkSite === "localhost") {
            counter = 3000;
        }

        let interval = setInterval(() => {
            if(!coinToss(0.8)) {
                createFatalError()
                clearInterval(interval);
                return false;
            }
        }, 1000)

        setTimeoutHandleCheckout = setTimeout(() => {
            clearInterval(interval);
            completeSimulation(true)
            swal.close();
            goto("/success")
        }, counter)
    }


</script>


<LayoutBuilder headerType="checkout">
    <div class="container">
        <div class="grid">
            <div class="Content1">
                <div class="card">
                    <h2>Delivery</h2>
                    <h3>Go Mobile - Free</h3>
                    <p>Your phone's your ticket. Locate your tickets in your fake account - or in your imaginary app. When you go mobile, your fairy tickets will not be emailed to your or available for print because they do not exist.</p>
                </div>

                <div class="card">
                    <h2>Parking</h2>

                    <div class="parking-spot">
                        <div class="flex">
                            <img src="/images/parking-1.jpg" alt="parking lot" />
                            <h3>Super Fancy Premium Parking</h3>
                        </div>

                        <div class="flex align-items-center justify-content-between">
                            <div>
                                <p><strong>Premium Lot</strong></p>
                                <p>$35.00</p>
                            </div>

                            <div class="flex align-items-center parking-box-container">
                                <button type="button" on:click={handleParkingDown1}><i class="bi bi-dash-circle"></i></button>
                                <div class="parking-box">{parkingSpotsChosen1}</div>
                                <button type="button" on:click={handleParkingUp1}><i class="bi bi-plus-circle"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="parking-spot">
                        <div class="flex">
                            <img src="/images/parking-1.jpg" alt="parking lot" />
                            <h3>Normal Parking With A Long Walk</h3>
                        </div>

                        <div class="flex align-items-center justify-content-between">
                            <div>
                                <p><strong>Normal Parking</strong></p>
                                <p>$25.00</p>
                            </div>

                            <div class="flex align-items-center parking-box-container">
                                <button type="button" on:click={handleParkingDown2}><i class="bi bi-dash-circle"></i></button>
                                <div class="parking-box">{parkingSpotsChosen2}</div>
                                <button type="button" on:click={handleParkingUp2}><i class="bi bi-plus-circle"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h2>Payment</h2>

                    <h3>Use Credit / Debit Card</h3>
                    <div class="pay-box flex align-items-center py-12 mb-24">
                        <i class="bi bi-plus-lg"></i>
                        <i class="bi bi-credit-card"></i>
                        <div>Add New Card</div>
                    </div>

                    <h3>Or Pay With</h3>
                    <p>By using a digital wallet and continuing past this page, you have read and are accepting the fake Terms of Use</p>
                    <div class="pay-box flex align-items-center py-12 mb-24">
                        <div class="flex align-items-center mr-24"><i class="bi bi-paypal"></i> Paypal</div>
                        <div class="flex align-items-center"><i class="bi bi-clock-history"></i> Pay Later</div>
                    </div>
                </div>

                <div class="card">
                    <h2 class="mb-24">Ticket Insurance (Selection Required)</h2>

                    <p class="mb-24"><strong>Get reimbursed up to 100% with Event Ticket Insurance for only $10.79 per ticket.</strong> *Offer expires when purchase is finalized.</p>

                    <p><strong>Peace of mind is only a click away.</strong> If you can't attend this event for a number of reasons like covered illness, airline delays, traffic accidents, weather emergencies, if you are required to work and more, you can be reimbursed for your ticket purchase. Protection also includes parking and other event related expenses that have been added to your order. You'll also receive access to a 24-hour hotline that can give you driving suggestions, provide parking information, make group arrangements, and much more.</p>

                    <p>Recommended/offered/sold by Allianz Global Assistance. Underwriter: Jefferson Insurance Company. Plan incl. insurance & assistance services. Terms & exclusions (incl. for pre-existing conditions) apply. Plan & Pricing details, disclosuresLearn more about terms and conditions. Link opens in a new window.. By clicking yes, you authorize Ticketmaster to send your name, address, and credit card information to AGA Service Company, who will charge your card on the terms described above.</p>

                    <div class="custom-radio">
                        <input id="ticket-protection-yes" type="radio" name="ticket-protection" value="yes" bind:group={ticketProtection}  />
                        <label for="ticket-protection-yes">Yes, protect my ticket purchase to BTS at This Cool Stadium. (Highly Recommended)</label>
                    </div>

                    <div class="custom-radio">
                        <input id="ticket-protection-no" type="radio" name="ticket-protection" value="no" bind:group={ticketProtection} />
                        <label for="ticket-protection-no">No, don't protect my ticket purchase. <br>107,808 people protected their tickets in the last 3 days</label>
                    </div>
                </div>
            </div>

            <div class="Content2">
                <div class="card">
                    <div class="flex align-items-center justify-content-between mb-24">
                        <h2>Total</h2>
                        <h2>$500.00</h2>
                    </div>

                    <p class="mb-24"><strong>*All Fake Sales Final - No Fake Refunds</strong></p>

                    <div class="terms-and-conditions form-control mb-24">
                        <input id="terms-and-conditions" type="checkbox" checked={agreeToTerms} on:change={(e) => {agreeToTerms = e.target.checked}} />
                        <label for="terms-and-conditions">I have read and agree to the current Terms of Use, and acknowledge that the Event Organizer is requiring proof of a negative test or COVID-19 vaccination to attend this event. Please check their website for details. Learn More
                        </label>
                    </div>

                    <div class="mb-12">
                        <button class="checkout-btn" on:click={handleCheckout}>Place Order</button>
                    </div>

                    <p>*Exceptions may apply, see our Terms of Use</p>
                </div>

                <div class="card">
                    <div class="mb-12"><img src="/images/map-1.svg" alt="random map"/></div>
                    <p><strong>BTS</strong></p>
                    Sat - {getFutureDate(6).prettyDate} - 6:00pm
                </div>
            </div>
        </div>
    </div>
</LayoutBuilder>


<style>
    .grid {
        display: grid;
        grid-template-columns: 55% 45%;
        grid-template-rows: 1fr;
        gap: 0 24px;
        grid-template-areas: "Content1 Content2";
    }

    .Content1 {
        grid-area: Content1;
    }
    .Content2 {
        grid-area: Content2;
    }

    .card {
        border: 1px solid #333;
        border-radius: 4px;
        padding: 24px;
        margin-bottom: 24px;
    }

    .flex {display: flex;}
    .justify-content-between {justify-content: space-between}
    .align-items-center {align-items: center;}

    .parking-spot {
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
    }
    .parking-spot img {
        max-width: 200px;
        margin-right: 24px;
        margin-bottom: 24px;
    }
    .parking-box-container {
        font-size: 20px;
    }
    .parking-box-container button {
        background-color: transparent;
        border: 0;
        padding: 0;
        margin: 0 12px;
        cursor: pointer;
    }
    .parking-box-container i {
        color: #0d6efd;
    }

    .form-control label {
        font-size: 16px;
    }

    .terms-and-conditions {
        display: flex;
    }

    input[type='checkbox'] {
        display: inline-block;
        width: auto;
    }

    .checkout-btn{
        padding: 12px 0;
        background-color: #0C8123;
        font-size: 20px;
        font-weight: 600;
        display: block;
        width: 100%;
        border: 0;
        color: #fff;
        cursor: pointer;
    }

    .pay-box {
        font-size: 20px;
    }

    .pay-box i {
        display: block;
        margin-right: 8px;
    }

    .custom-radio {
        font-size: 20px;
        display: flex;
        padding: 12px 0;
    }

    .custom-radio input {
        margin-top: 10px;
        min-width: 20px;
        min-height: 20px;
        margin-right: 12px;
    }
</style>