<template>
  <v-app>
      <v-container fluid class="background">
        <v-row justify="center" class="mt-12">
          <v-col cols="12" md="8">
            <material-card>
              <template v-slot:heading>
                <div class="display-2 font-weight-light">Edit Profile</div>

                <div class="subtitle-1 font-weight-light">
                  Complete your profile
                </div>
              </template>
              <v-form>
                <v-container class="py-0">
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field label="Company" dark/>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field class="purple-input" label="User Name" dark/>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        label="Email Address"
                        class="purple-input"
                        dark
                      />
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field label="First Name" class="purple-input" dark/>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field label="Last Name" class="purple-input" dark/>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Adress" class="purple-input" dark/>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field label="City" class="purple-input" dark/>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field label="Country" class="purple-input" dark/>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        class="purple-input"
                        label="Postal Code"
                        type="number"
                        dark
                      />
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        class="purple-input"
                        label="About My Company"
                        value=""
                        dark
                      />
                    </v-col>

                    <v-col cols="12" class="text-right">
                      <v-btn color="success" class="mr-0">
                        Update Profile
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </material-card>
          </v-col>

          <v-col cols="12" md="4">
            <material-card
              class="v-card-profile"
              avatar="https://img.freepik.com/vecteurs-libre/illustration-vectorielle-outils-coiffeur-ciseaux-rasoir-poteau-ruban-echantillon-texte_74855-10555.jpg?size=338&ext=jpg&ga=GA1.2.1637736129.1624752000"
            >
              <v-card-text class="text-center">
                <h6 class="display-1 mb-1 grey--text">Hair Salon</h6>

                <h4 class="display-2 font-weight-light mb-3 white--text">
                  Art'Hair
                </h4>

                <p class="font-weight-light grey--text">
                  Since 2019, Art'Hair is an innovative concept in the heart of Bordeaux in a warm atmosphere and a trendy decor. 
                  The promise? A real hair experience: a tailor-made cut, under the expert advice and artistic work of experienced and creative facial hairdressers. 
                  True masters of technique, everything is possible here: cuts, highlights, balayage, ombré hair, tie and dye, Japanese and Brazilian straightening.
                </p>

                <v-btn color="success" rounded class="mr-0"> Follow </v-btn>
              </v-card-text>
            </material-card>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
import materialCard from "@/components/MaterialCard.vue"

export default {
  components: { materialCard},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.background {
  height: 100%;
}
</style>