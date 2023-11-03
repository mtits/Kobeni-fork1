<script setup lang="ts">
  usePageHead('Home')

  const currentUser = useState('currentUser')
</script>

<template>
  <div class="min-h-screen flex flex-col gap-5" v-if="currentUser">

  
    <div class="text-center flex flex-col items-center gap-3">
     <!--   <div>
        <img src="/kobeni.png" class="w-36 h-36 rounded-full object-cover transition hover:scale-105" />
      </div> 
    -->

      <PageTitle title="Veib x MTITS Tester">
        <span class="text-sm">
          Combination of all the Tools necessary to procure success
        </span>
      </PageTitle>
    </div>

    <!-- PAY.ON Tools -->
    <div class="mt-10">
      <PageTitle title="PAY.ON Tools" />
      <div class="flex flex-wrap gap-2">
        <HomeItem title="COPYandPAY" nav-to="/payon/copyandpay">
          COPYandPAY is a SAQ-A compliant payment-form solution, making it both secure and simple-to-integrate.
        </HomeItem>

        <HomeItem title="Server-to-server" nav-to="/payon/server-to-server">
          Allows payment acceptance services to be integrated directly, offering fully flexible workflows for frontend
          and
          backend processing.
        </HomeItem>

        <HomeItem title="Backoffice" nav-to="/payon/backoffice">
          Backoffice operations can be performed against initial payments that were generated using COPYandPAY or
          server-to-server.
        </HomeItem>

        <HomeItem title="Recurring" nav-to="/payon/recurring">
          Subscriptions, monthly payments, installments, you get the idea.
        </HomeItem>

        <HomeItem title="Transaction Doko?" nav-to="/payon/reporting-api">
          Allows you to search for previous transactions using the merchantTransactionId or paymentId in order to query
          the response.
        </HomeItem>

        <HomeItem title="Schindler's List" nav-to="/payon/schindlerslist">
          Query a list of transactions via a date range and some filters.
        </HomeItem>

        <HomeItem title="Format Thy MID" nav-to="/payon/fmmid">
          Auto-formats any given credentials to match BIP's required format for 3DS v2.
        </HomeItem>

        <HomeItem title="Result Codes" nav-to="/payon/resultcodes">
          Fetches the latest list of result codes from PAY.ON's documentation.
        </HomeItem>

        <HomeItem title="Webhook Decryptor" nav-to="/payon/webhook-decryptor">
          웹후크 페이로드를 해독하는 도구입니다. 필수 필드를 채우고 버튼을 클릭합니다.
        </HomeItem>

        <HomeItem title="BIP URL Generator" nav-to="/payon/bipurlgen">
          For when they have their own login page.
        </HomeItem>
      </div>
    </div>

    <!-- Paymentz Tools -->
    <div class="mt-10">
      <PageTitle title="PaymentZ Tools" />
      <div class="flex flex-wrap gap-2">
        <HomeItem title="Standard Checkout" nav-to="/paymentz/standardcheckout">
          In Standard Checkout, the merchant needs to post the intial request to the hosted checkout page where customer
          will provide card/account details.
        </HomeItem>

        <HomeItem title="AuthToken" nav-to="/paymentz/generateAuthToken">
          Standalone tool for generating the auth token.
        </HomeItem>

        <HomeItem title="REST API" nav-to="/paymentz/restApi">
          REST API is one of ways to integrate with the PaymentZ platform and provides full opportunities for
          interaction with the payment platform.
        </HomeItem>

        <HomeItem title="Backoffice" nav-to="/paymentz/backoffice">
          [WIP] - List transactions and perform backoffice operations.
        </HomeItem>
      </div>
    </div>

    <!-- My tools -->
    <div class="mt-10">
      <PageTitle title="Other Stuffs" />
      <div class="flex flex-wrap gap-2">
        <HomeItem title="Soundboard" nav-to="/tomorrow">
          Buttons with sounds.
        </HomeItem>

        <HomeItem title="Beshify" nav-to="/beshiefy">
          In case malungkot ang beshy ko
        </HomeItem>
      </div>
    </div>

  </div>

  <LoadingDisplay v-else />
</template>
