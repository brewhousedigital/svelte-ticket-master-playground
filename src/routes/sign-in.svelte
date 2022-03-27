<script>
    import {user} from "$lib/store.js";
    import LayoutBuilder from "$lib/components/LayoutBuilder.svelte";
    import {goto} from "$app/navigation";

    $: {console.log(">>user", $user)}

    let loginInfo = {
        email: "",
        password: ""
    }

    function handleLogin(e) {
        e.preventDefault();

        if(!loginInfo.email || !loginInfo.password) {
            return false;
        }

        user.set(loginInfo);
        goto("/")
    }
</script>


<LayoutBuilder headerType="blank">
    <div class="background">
        <div class="container container-sm">
            <div class="grid">
                <div class="Image">
                    <h1>Welcome Back</h1>
                    <p>Pretend to discover millions of events, not receive any alerts about your favorite artists, plays and less, plus always secure, effortless fun.</p>
                </div>

                <div class="Content">
                    <h2>Sign In</h2>
                    <p>New to BTS Ticket Simulator? Sign Up</p>
                    <p>Enter a fake email and password to get logged in.</p>

                    <form on:submit={handleLogin}>
                        <div class="form-control">
                            <label>Email Address</label>
                            <input type="email" bind:value={loginInfo.email} required />
                        </div>

                        <div class="form-control">
                            <label>Password</label>
                            <input type="password" bind:value={loginInfo.password} required />
                        </div>

                        <p class="mb-24">By continuing past this page, you agree that this is a fake website and none of the information entered here is saved. You will also never be able to buy real tickets on this site. This is just to practice.</p>

                        <p class="text-end">
                            <button type="submit" class="shop-cta">Sign In</button>
                        </p>
                    </form>
                </div>
            </div>
        </div><!-- end container -->
    </div>
</LayoutBuilder>


<style>
    .background {
        background-color: #f6f6f6;
    }
    .container {
        height: 100vh;
        display: flex;
        align-items: center;
    }
    .grid {
        background-color: #fff;
        border-radius: 4px;
        box-shadow: rgb(0 0 0) 0px 10px 22px -23px;
        display: grid;
        grid-template-columns: 33% 67%;
        grid-template-rows: 1fr;
        gap: 0 0;
        grid-template-areas: "Image Content";
    }

    .Image {
        grid-area: Image;
        padding: 60px 30px;
        background-color: #222;
        color: #fff;
        background-image: url("/images/sign-in-block.jpg");
        background-size: cover;
        background-position: center;
    }

    .Content {
        grid-area: Content;
        padding: 60px 30px;
    }

    form {
        margin-top: 40px;
    }
</style>