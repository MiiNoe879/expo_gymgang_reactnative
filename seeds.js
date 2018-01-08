const FirebaseLinks = require('./firebaseContext/firebase_links');

const firebase = require('./connection.js');

let bodyPartsMale = [
  {
    name: "chest",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_chest_male.png?alt=media&token=5019139d-8b8a-4223-85cb-31e1455c4599'
  },
  {
    name: "biceps",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_biceps_male.png?alt=media&token=06476d0c-7388-45a1-bd0b-17e1cd5ff7d8'
  },
  {
    name: "forearm",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_forearm_male.png?alt=media&token=e9c00729-b5a1-4634-a7c2-882d733d664c'
  },
  {
    name: "waist",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_abs_male.png?alt=media&token=1f053bde-230b-400c-8f3c-4d2a3d2e0c38'
  },
  {
    name: "belt",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_abs_male.png?alt=media&token=1f053bde-230b-400c-8f3c-4d2a3d2e0c38'
  },
  {
    name: "hips",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_abs_male.png?alt=media&token=1f053bde-230b-400c-8f3c-4d2a3d2e0c38'
  },
  {
    name: "thigh",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_triceps_male.png?alt=media&token=8fc5f0ec-6e75-4420-a350-e485ba457576'
  },
  {
    name: "calf",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_calves_male.png?alt=media&token=d2335135-0b45-4cbb-a0f3-0de710ffbf3e'
  },
  {
    name: "weight",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_weight.png?alt=media&token=edb44ca4-6138-4f31-ba82-95a5b69d02fb'
  }
]

let bodyPartsFemale = [
  {
    name: "chest",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_chest_female.png?alt=media&token=b615c85a-630b-4642-8f5c-9f57f99a048d'
  },
  {
    name: "biceps",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_biceps_female.png?alt=media&token=5c77cd39-e3eb-4168-b1f9-604ab03b6b67'
  },
  {
    name: "forearm",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_forearm_female.png?alt=media&token=06bdeb7c-7bb4-40b6-b46a-04106424490b'
  },
  {
    name: "waist",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_abs_female.png?alt=media&token=c1f3c8ff-30d2-4ba2-a5ff-06008096548e'
  },
  {
    name: "belt",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_abs_female.png?alt=media&token=c1f3c8ff-30d2-4ba2-a5ff-06008096548e'
  },
  {
    name: "hips",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_abs_female.png?alt=media&token=c1f3c8ff-30d2-4ba2-a5ff-06008096548e'
  },
  {
    name: "thigh",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_triceps_female.png?alt=media&token=820a41d2-35d8-4c01-a0ee-c8b1152a6ab7'
  },
  {
    name: "calf",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_calves_female.png?alt=media&token=54b552b3-3f76-4441-9002-1aaa68dd2198'
  },
  {
    name: "weight",
    img: 'https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_weight.png?alt=media&token=edb44ca4-6138-4f31-ba82-95a5b69d02fb'
  }
]

let muscleParts = [
  {
    name:       "traps",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_traps_male.png?alt=media&token=eff2a5d6-4758-43d4-bb04-cc73e5c135ec",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_traps_female.png?alt=media&token=585b7e13-5852-4bc1-853f-8f2a1329e35f"
  },
  {
    name:       "shoulders",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_shoulders_male.png?alt=media&token=f99b4edc-45b3-4639-950e-fa9f3f79ac45",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_shoulders_female.png?alt=media&token=12068a13-b035-426c-8cf0-87eeb91523cc"
  },
  {
    name:       "chest",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_chest_male.png?alt=media&token=d0c3ba93-f635-4f4b-9263-b2d79808e66c",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_chest_female.png?alt=media&token=f2c8f25f-56f1-4905-95ec-74b20488bf94"
  },
  {
    name:       "biceps",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_biceps_male.png?alt=media&token=bdd4d1d8-f5a9-43e9-9e12-8c493a433314",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_biceps_female.png?alt=media&token=44e3d8c7-eb3c-4553-8aec-3df0e3d90bc5"
  },
  {
    name:       "triceps",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_triceps_male.png?alt=media&token=f0c212a3-bdcd-4991-a0ab-225dde5d2c31",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_triceps_female.png?alt=media&token=c10240b0-3b88-4545-ac5d-9afc07f5c8c9"
  },
  {
    name:       "forearm",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_forearm_male.png?alt=media&token=703f04f5-22f5-4f18-aa12-e441a0edba9c",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_forearm_female.png?alt=media&token=00bbbcab-5f19-43c4-91a3-0a2290e33a70"
  },
  {
    name:       "abs",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_abs_male.png?alt=media&token=1f053bde-230b-400c-8f3c-4d2a3d2e0c38",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_abs_female.png?alt=media&token=c1f3c8ff-30d2-4ba2-a5ff-06008096548e"
  },
  {
    name:       "middleBack",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_middle_back_male.png?alt=media&token=0459bb0f-7e14-45ef-b553-2706083d898b",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_middle_back_female.png?alt=media&token=e69d0439-0749-4a42-a212-b35c0a73083e"
  },
  {
    name:       "lowBack",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_lower_back_male.png?alt=media&token=f6fff43f-f6de-47c2-89d8-81a9675f5dd2",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_lower_back_female.png?alt=media&token=6f894ff7-2897-4f0c-afe0-f690ad474e58"
  },
  {
    name:       "glutes",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_glutes_male.png?alt=media&token=f0e16fdb-7522-4bd4-893d-3155fa414d3f",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_glutes_female.png?alt=media&token=66d53319-1a11-47dc-8eec-c9404b5dbda2"
  },
  {
    name:       "quads",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_quads_male.png?alt=media&token=f821a9ac-ed88-40a2-a9d4-480619095f5b",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/icon_quads_female.png?alt=media&token=33dff8d5-6a3e-418f-8b58-b78e68e6e4f5"
  },
  {
    name:       "hamstrings",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_hamstrings_male.png?alt=media&token=147b3ba5-e3cb-44c3-acca-78c1eebbdef6",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_hamstrings_female.png?alt=media&token=6ba8b0e7-0aa2-4d83-adef-2d3849b8c8f5"
  },
  {
    name:       "calves",
    maleImg:    "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_calves_male.png?alt=media&token=1b7beb03-4169-4cc0-afae-a78a136797bf",
    femaleImg:  "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ficon_calves_female.png?alt=media&token=6e26e89f-6485-4cf5-aca6-090168b423b7"
  },
];

let MuscleExercises = {
  abs: [
      {
        name: "bicycle_kicks",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fair_bike.png?alt=media&token=a5cec21d-3e0d-4378-b842-e2911eab3135"
      },
      {
        name: "Bent_Legs_Cross_Crunches",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fcross_body_crunch.png?alt=media&token=ccfd38a4-1676-45bc-99eb-23474432829c"
      },
      {
        name: "Raised_Legs_Cross_Crunches",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fcross_body_crunch.png?alt=media&token=ccfd38a4-1676-45bc-99eb-23474432829c"
      },
      {
        name: "Bent_Legs_Crunches",
        img: 0
      },
      {
        name: "Raised_Legs_Crunches",
        img: 0
      },
      {
        name: "Decline_Bench_Crunches",
        img: 0
      },
      {
        name: "dotykanie_piet_lezac",
        img: 0
      },
      {
        name: "nozyce_lezac",
        img: 0
      },
      {
        name: "odwodzenie_kolana_w_tyl_w_podparciu_przodem",
        img: 0
      },
      {
        name: "odwodzenie_nogi_w_tyl_w_podparciu_przodem",
        img: 0
      },
      {
        name: "odwrotne_spiecia_brzucha_uniesione_nogi",
        img: 0
      },
      {
        name: "plank",
        img: 0
      },
      {
        name: "przyciaganie_nog_do_klatki_piersiowej_lezac",
        img: 0
      },
      {
        name: "rowerek_spiecia_brzucha",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fair_bike.png?alt=media&token=a5cec21d-3e0d-4378-b842-e2911eab3135"
      },
      {
        name: "rowerek_spiecia_brzucha_ze_skretem_tulowia",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fair_bike.png?alt=media&token=a5cec21d-3e0d-4378-b842-e2911eab3135"
      },
      {
        name: "scyzoryki_lezac_v_ups",
        img: 0
      },
      {
        name: "skrety_tulowia_ze_sztanga_stojac",
        img: 0
      },
      {
        name: "sklony_boczne_na_lawce_rzymskiej",
        img: 0
      },
      {
        name: "sklony_boczne_z_linka_wyciagu_stojac",
        img: 0
      },
      {
        name: "Sklony_boczne_z_hantlami_stojac",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fside_bend_with_dumbbell.png?alt=media&token=5672f163-8ec7-44d3-9950-c935f60742c9"
      },
      {
        name: "spiecia_brzucha_laweczka_ujemna",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fdecline_crunch.png?alt=media&token=3d08af47-fa85-4359-80a0-8dae3867bf54"
      },
      {
        name: "spiecia_brzucha_bokiem_na_maszynie_siedzac",
        img: 0
      },
      {
        name: "spiecia_brzucha_lezac_bokiem",
        img: 0
      },
      {
        name: "spiecia_brzucha_na_maszynie_siedzac",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fseated_ab_crunch_with_cable.png?alt=media&token=8b151b39-a52d-4cd5-a15f-cac84a623560"
      },
      {
        name: "spiecia_brzucha_na_wyciagu_stojac",
        img: 0
      },
      {
        name: "spiecia_brzucha_z_podpaciem_nog_lezac",
        img: 0
      },
      {
        name: "spiecia_brzucha_z_podparciem_nog_lezac_bokiem",
        img: 0
      },
      {
        name: "spiecia_brzucha_ugiete_nogi",
        img: 0
      },
      {
        name: "spiecia_brzucha_uniesione_nogi",
        img: 0
      },
      {
        name: "toczenie_sztangi_kleczac",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fab_rollout_on_knees_with_barbell.png?alt=media&token=06553034-2799-49ff-9d5b-18ad6a291b7d"
      },
      {
        name: "unoszenie_bioder_nogi_w_gorze_lezac",
        img: 0
      },
      {
        name: "unoszenie_bioder_ugiete_nogi_lezac",
        img: 0
      },
      {
        name: "unoszenie_kolan_w_zwisie",
        img: 0
      },
      {
        name: "unoszenie_nog_lezac",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fflat_bench_leg_raises.png?alt=media&token=fe063d59-77ba-4a3e-b8c5-3af3db45d87b"
      },
      {
        name: "unoszenie_nog_w_zwisie",
        img: 0
      },
      {
        name: "unoszenie_tulowia_z_nogami_w_gorze_lezac",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbent_knee_hip_raise.png?alt=media&token=5cf497cc-1b73-4236-a30a-98516aaedb07"
      },
      {
        name: "sciaganie_linki_wyciagu_gornego_prz_prostych_lokciach_stojac",
        img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fseated_ab_crunch_with_cable.png?alt=media&token=8b151b39-a52d-4cd5-a15f-cac84a623560"
      }
  ],
  biceps: [
    {
      name: "incline_hammer_curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fprone_incline_biceps_curl_with_dumbbell.png?alt=media&token=73dca928-2aaa-403e-bc82-a71cc7ef42aa"
    },
    {
      name: "incline_inner_biceps_curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fprone_incline_biceps_curl_with_dumbbell.png?alt=media&token=73dca928-2aaa-403e-bc82-a71cc7ef42aa"
    },
    {
      name: "standing_concentration_curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fstanding_inner_biceps_curl_with_dumbbell.png?alt=media&token=70952057-b5fa-4207-9534-657b83d1d03a"
    },
    {
      name: "ez_bar_curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fclose_grip_standing_bicep_curls_with_barbell.png?alt=media&token=3a20cc8c-f686-4494-a3bd-5f98dba21c45"
    },
    {
      name: "wide_grip_standing_barbell_curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fclose_grip_standing_bicep_curls_with_barbell.png?alt=media&token=3a20cc8c-f686-4494-a3bd-5f98dba21c45"
    },
    {
      name: "zottman_curl",
      img: 0
    },
    {
      name: "barbell_curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fclose_grip_standing_bicep_curls_with_barbell.png?alt=media&token=3a20cc8c-f686-4494-a3bd-5f98dba21c45"
    },
    {
      name: "dumbbell_biceps_curl",
      img: 0
    },
    {
      name: "hammer_curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Falternating_hammer_curl_with_dumbbell.png?alt=media&token=78be6e61-66d6-40aa-ab66-018c1260d324"
    },
    {
      name: "overhead_cable_curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Foverhead_curl_with_cable.png?alt=media&token=ffb00e8f-ce6a-45e1-a591-866809369f25"
    },
    {
      name: "Seated_Alternate_Reverse_Grip_Dumbbell_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Falternating_hammer_curl_with_dumbbell.png?alt=media&token=78be6e61-66d6-40aa-ab66-018c1260d324"
    },
    {
      name: "Standing_Alternate_Reverse_Grip_Dumbbell_Curls",
      img: 0
    },
    {
      name: "Alternate_Dumbbell_Hammer_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fcross_body_hammer_curl_with_dumbbell.png?alt=media&token=19c2be85-5b9b-4223-89ab-c5c3eef0dcff"
    },
    {
      name: "Medium_Overhand_Grip_Pull_up",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpull_ups.png?alt=media&token=fd77c1b3-2589-4c7a-9e42-8fd448be8c02"
    },
    {
      name: "Assisting_Machine_Medium_Overhand_Grip_Pull_up",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpull_ups.png?alt=media&token=fd77c1b3-2589-4c7a-9e42-8fd448be8c02"
    },
    {
      name: "Medium_Underhand_Grip_Pull_up",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpull_ups.png?alt=media&token=fd77c1b3-2589-4c7a-9e42-8fd448be8c02"
    },
    {
      name: "Assisting_Machine_Medium_Underhand_Grip_Pull_up",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpull_ups.png?alt=media&token=fd77c1b3-2589-4c7a-9e42-8fd448be8c02"
    },
    {
      name: "Close_Overhand_Grip_Pull_up",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpull_ups.png?alt=media&token=fd77c1b3-2589-4c7a-9e42-8fd448be8c02"
    },
    {
      name: "Single_arm_Dumbbell_Curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fconcentration_curls_with_dumbbell.png?alt=media&token=954e3896-c598-4283-9f7b-781c067c3615"
    },
    {
      name: "Cross_Body_Cable_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fstanding_one_arm_bicep_curl_with_cable.png?alt=media&token=58c00a03-d80e-4989-8088-62e7bd58ff51"
    },
    {
      name: "Standing_Cross_Body_Dumbbell_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fcross_body_hammer_curl_with_dumbbell.png?alt=media&token=19c2be85-5b9b-4223-89ab-c5c3eef0dcff"
    },
    {
      name: "Seated_Cross_Body_Dumbbell_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fconcentration_curls_with_dumbbell.png?alt=media&token=954e3896-c598-4283-9f7b-781c067c3615"
    },
    {
      name: "Seated_Machine_Reverse_Grip_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpreacher_curl_with_machine.png?alt=media&token=7410b145-3244-43ff-952f-bc279c024947"
    },
    {
      name: "Scotts_Machine_Preacher_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpreacher_curl_with_machine.png?alt=media&token=7410b145-3244-43ff-952f-bc279c024947"
    },
    {
      name: "Standing_Over_Head_Cable_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Foverhead_curl_with_cable.png?alt=media&token=ffb00e8f-ce6a-45e1-a591-866809369f25"
    },
    {
      name: "Lying_Cable_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Flying_bicep_cable_curl.png?alt=media&token=ac3e1341-60a0-4157-bbb2-5863f11f490c"
    },
    {
      name: "Standing_Cable_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fstanding_biceps_curl_with_cable.png?alt=media&token=4ee25a25-a334-4ed8-b028-e1d799e97ea8"
    },
    {
      name: "Preacher_Cable_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpreacher_curl_with_cable.png?alt=media&token=9a5a2e28-a676-43df-bebc-63a4b904a77f"
    },
    {
      name: "Incline_Bench_Cable_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Flying_bicep_cable_curl.png?alt=media&token=ac3e1341-60a0-4157-bbb2-5863f11f490c"
    },
    {
      name: "Bench_Cable_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Flying_bicep_cable_curl.png?alt=media&token=ac3e1341-60a0-4157-bbb2-5863f11f490c"
    },
    {
      name: "Standing_Hammer_Curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Falternating_hammer_curl_with_dumbbell.png?alt=media&token=78be6e61-66d6-40aa-ab66-018c1260d324"
    },
    {
      name: "Dumbbel_Preacher_Curl",
      img: 0
    },
    {
      name: "Dumbbell_Prone_Incline_Curl",
      img: 0
    },
    {
      name: "Incline_Seated_Dumbbell_Curl",
      img: 0
    },
    {
      name: "Seated_Reverse_Grip_Curls",
      img: 0
    },
    {
      name: "Standing_Reverse_Dumbbell_Curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fstanding_inner_biceps_curl_with_dumbbell.png?alt=media&token=70952057-b5fa-4207-9534-657b83d1d03a"
    },
    {
      name: "Standing_Wide_Grip_EZ_Barbell_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fclose_grip_ez_bar_curl_with_barbell.png?alt=media&token=56c2a75b-5419-4a89-89c6-e005e821bc4a"
    },
    {
      name: "Preacher_Barbell_Curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpreacher_curl_with_barbell.png?alt=media&token=44df7eb8-c21b-4048-bc74-694e4b73f09b"
    },
    {
      name: "Barbell_Prone_Incline_Curls",
      img: 0
    },
    {
      name: "Incline_Seated_Barbell_Curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Flying_incline_curl_with_barbell.png?alt=media&token=da4ad632-8420-4b7f-ac2e-31b3fbd772e2"
    },
    {
      name: "Standing_Barbell_Curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fclose_grip_standing_bicep_curls_with_barbell.png?alt=media&token=3a20cc8c-f686-4494-a3bd-5f98dba21c45"
    },
    {
      name: "EZ_Bar_Preacher_Curl",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpreacher_curl_with_barbell.png?alt=media&token=44df7eb8-c21b-4048-bc74-694e4b73f09b"
    },
    {
      name: "Standing_Reverse_Grip_EZ_Bar_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fclose_grip_ez_bar_curl_with_barbell.png?alt=media&token=56c2a75b-5419-4a89-89c6-e005e821bc4a"
    },
    {
      name: "Standing_Close_Grip_EZ_Bar_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fclose_grip_ez_bar_curl_with_barbell.png?alt=media&token=56c2a75b-5419-4a89-89c6-e005e821bc4a"
    },
    {
      name: "Standing_Wide_Grip_EZ_Bar_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fclose_grip_ez_bar_curl_with_barbell.png?alt=media&token=56c2a75b-5419-4a89-89c6-e005e821bc4a"
    },
    {
      name: "Standing_Close_Grip_Barbell_Curls",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fclose_grip_standing_bicep_curls_with_barbell.png?alt=media&token=3a20cc8c-f686-4494-a3bd-5f98dba21c45"
    },
    {
      name: "Standing_Upright_Dumbbell_Row",
      img: 0
    },
    {
      name: "Standing_Upright_Barbell_Row",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fupright_barbell_rows.png?alt=media&token=10dc2cfd-1bde-49eb-9b9d-2d9b51c31e4a"
    },
    {
      name: "Standing_Upright_Cable_Row",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fupright_cable_row.png?alt=media&token=3835a1d3-24a1-4fa2-9931-717144bd35cd"
    },
    {
      name: "Standing_Upright_Smith_Machine_Barbell_Row",
      img: 0
    },
    {
      name: "sciaganie_drazka_wyciagu_gornego_do_klatki_piersiowej_nadchwytem_waski",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Funderhand_pull_down.png?alt=media&token=e374c778-0f25-4f01-bc02-fe6c6021e124"
    },
    {
      name: "sciaganie_drazka_wyciągu_gornego_do_klatki_piersiowej_podchwytem_waski",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Funderhand_pull_downs.png?alt=media&token=ef97c172-41ab-4060-98e4-098d25c3b12b"
    },
  ],



// let FunctionalExercises = [
//   {
//     name: "burpee"
//   },
//   {
//     name: "mountineClimber"
//   },
//   {
//     name: "pompki",
//     img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpush_ups.png?alt=media&token=38a2272e-95b6-4477-af9d-c0f6705d4be0"
//   },
//   {
//     name: "pompkinaPilce"
//   },
//   {
//     name: "pompkinaBosu"
//   },
//   {
//     name: "pompkinaKolanach"
//   },
//   {
//     name: "martwyCiagNaProstychNogach"
//   },
//   {
//     name: "skipBokserski"
//   },
//   {
//     name: "pajacyki"
//   },
//   {
//     name: "swingzKettlebell"
//   }
// ];

  chest: [
    {
      name: "Barbell_bench_press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbench_press.png?alt=media&token=eb9ea58c-5681-4030-a12f-4b7cba6753a6"
    },
    {
      name:"Flat_bench_dumbbell_press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fincline_dumbbell_press.png?alt=media&token=c7a31148-ce81-4d1a-aa29-bb01c3c662c6"
    },
    {
      name: "Low_incline_barbell_bench_press",
      img: 0
    },
    {
      name: "Machine_decline_press",
      img: 0
    },
    {
      name: "Seated_machine_chest_press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fincline_chest_press.png?alt=media&token=e9c5fafc-ff29-4683-a4b3-5fb73efc51b5"
    },
    {
      name: "Incline_dumbbell_press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fincline_dumbbell_press.png?alt=media&token=c7a31148-ce81-4d1a-aa29-bb01c3c662c6"
    },
    {
      name: "Dips_for_chest",
      img: 0
    },
    {
      name: "Incline_bench_cable_fly",
      img: 0
    },
    {
      name: "Incline_dumbbell_pull_over",
      img: 0
    },
    {
      name: "Pec_deck_machine",
      img: 0
    },
    {
      name: "Standing_Cable_Crossovers",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fcable_crossover.png?alt=media&token=b25726c9-8f5d-46bb-bb72-ca3643f03fa8"
    },
    {
      name: "Assisting_Machine_Dips",
      img: 0
    },
    {
      name: "Wide_Grip_Bent_Over_Dips",
      img: 0
    },
    {
      name: "Handrail_Bent_Over_Dips",
      img: 0
    },
    {
      name: "Wide_Grip_Push_ups_with_Leg_on_Suspension",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpush_ups_with_feet_elevated.png?alt=media&token=6875a1f1-d9b2-4414-9563-3acc665fc837"
    },
    {
      name: "Wide_Grip_Push_ups",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fpush_ups.png?alt=media&token=38a2272e-95b6-4477-af9d-c0f6705d4be0"
    },
    {
      name: "Przeciąganie_linek_wyciągu_za_głowę",
      img: 0
    },
    {
      name: "Przenoszenie_sztangi_za_głowę",
      img: 0
    },
    {
      name: "Przenoszenie_sztangi_łamanej_za_głowę",
      img: 0
    },
    {
      name: "Przenoszenie_hantli_za_głowę",
      img: 0
    },
    {
      name: "Rozpiętki_na_maszynie_ramiona_wyprostowane_siedząc",
      img: 0
    },
    {
      name: "Incline_Bench_Cable_Flys",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fflat_bench_cable_flys.png?alt=media&token=92b4280b-8e15-42f7-8f58-e2bd9083fcc3"
    },
    {
      name: "Pec_Dec_Seated_Machine_Flys",
      img: 0
    },
    {
      name: "Decline_Bench_Cable_Flys",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fflat_bench_cable_flys.png?alt=media&token=92b4280b-8e15-42f7-8f58-e2bd9083fcc3"
    },
    {
      name: "Incline_Dumbbell_Flys",
      img: 0
    },
    {
      name: "Dumbbell_Flys",
      img: 0
    },
    {
      name: "Decline_Dumbbell_Flys",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fdecline_dumbbell_flys.png?alt=media&token=987446d9-b143-418d-a286-a5c3b6f8ab7f"
    },
    {
      name: "Incline_Dumbbell_Flys_with_Supination",
      img: 0
    },
    {
      name: "Dumbbell_Flys_with_Supination",
      img: 0
    },
    {
      name: "Decline_Dumbbell_Flys_with_Supination",
      img: 0
    },
    {
      name: "Front_Seated_Machine_Press",
      img: 0
    },
    {
      name: "Incline_Machine_Press",
      img: 0
    },
    {
      name: "Machine_Press",
      img: 0
    },
    {
      name: "Decline_Machine_Press",
      img: 0
    },
    {
      name: "Wide_Grip_Incline_Smith_Machine_Bench_Press",
      img: 0
    },
    {
      name: "Wide_Grip_Smith_Machine_Bench_Press",
      img: 0
    },
    {
      name: "Wide_Grip_Decline_Smith_Machine_Bench_Press",
      img: 0
    },
    {
      name: "Incline_Smith_Machine_Bench_Press",
      img: 0
    },
    {
      name: "Smith_Machine_Bench_Press",
      img: 0
    },
    {
      name: "Decline_Smith_Machine_Bench_Press",
      img: 0
    },
    {
      name: "Wide_Grip_Incline_Barbell_Bench_Press",
      img: 0
    },
    {
      name: "Decline_Barbell_Bench_Press",
      img: 0
    },
    {
      name: "Wide_Grip_Decline_Barbell_Bench_Press",
      img: 0
    },
    {
      name: "Palms_in_Incline_Dumbbell_Bench_Press",
      img: 0
    },
    {
      name: "Palms_in_Dumbbell_Bench_Press",
      img: 0
    },
    {
      name: "Palms_in_Decline_Dumbbell_Bench_Press",
      img: 0
    },
    {
      name: "Incline_Seated_Dumbell_Press",
      img: 0
    },
    {
      name: "Dumbbell_Bench_Press",
      img: 0
    },
    {
      name: "Decline_Dumbbel_Bench_Press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fdecline_dumbbell_bench_press.png?alt=media&token=4ce5517a-140c-4088-bb84-cb0d4722930f"
    },
  ],

  calves: [
    {
      name: "Standing_machine_calf_raises",
      img: 0
    },
    {
      name: "Smith_machine_calf_raises",
      img: 0
    },
    {
      name: "One_legged_dumbbell_calf_raises",
      img: 0
    },
    {
      name: "Leg_press_calf_raise",
      img: 0
    },
    {
      name: "Seated_machine_calf_raises",
      img: 0
    },
    {
      name: "Wspięcia_na_palce_ze_sztangą_siedząc",
      img: 0
    },
    {
      name: "Wspięcia_na_palce_ze_sztangą_stojąc",
      img: 0
    },
  ],

  forearm: [
    {
      name: "Barbell_wrist_curls",
      img: 0
    },
    {
      name: "Barbell_reverse_wrist_curls",
      img: 0
    },
    {
      name: "Dumbbell_wrist_curl",
      img: 0
    },
    {
      name: "Dumbbell_reverse_wrist_curl",
      img: 0
    },
    {
      name: "Reverse_barbell_curls",
      img: 0
    },
    {
      name: "Standing_Wrist_Cable_Reverse_Curls",
      img: 0
    },
    {
      name: "Standing_Reverse_Wrist_Curls_with_Barbell_Plate",
      img: 0
    },
    {
      name: "Standing_Barbell_Reverse_Wrist_Curls",
      img: 0
    },
    {
      name: "Podciąganie_się_nadchytem_wąski_rozstaw_rąk",
      img: 0
    },
    {
      name: "Seated_Lateral_Wrist_Cable_Curls",
      img: 0
    },
    {
      name: "Standing_Wrist_Cable_Curls",
      img: 0
    },
    {
      name: "Seated_Underhand_Dumbbell_Wrist_Curls",
      img: 0
    },
    {
      name: "Seated_Underhand_Barbell_Wirst_Curls",
      img: 0
    },
    {
      name: "Standing_Underhand_Barbell_Wrist_Curls",
      img: 0
    },
    {
      name: "Standing_Underhand_Behind_Barbell_Wirst_Curls",
      img: 0
    },
    {
      name: "Uginanie_nadgarstków_ze_sztangą_łamaną_podchwytem_siedząc",
      img: 0
    },
    {
      name: "Seated_Underhand_EZ_Bar_Wrist_Curls",
      img: 0
    },
  ],

  glutes: [
    {
      name: "squats",
      img: 0
    },
    {
      name: "Weighted_Walking_Lunges",
      img: 0
    },
    {
      name: "Barbell_Hip_Thrusts",
      img: 0
    },
    {
      name: "Stiff_Legged_Deadlifts",
      img: 0
    },
    {
      name: "Bulgarian_Split_Squats",
      img: 0
    },
    {
      name: "Wide_Stand_Barbell_Sumo_Deadlift",
      img: 0
    },
    {
      name: "Dumbbell_Deadlift",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fdumbbell_dead_lifts.png?alt=media&token=7c768858-6847-4b0f-ace7-c53499bab73b"
    },
    {
      name: "Barbell_Deadlift",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_dead_lifts.png?alt=media&token=746b81a8-87e8-4a77-aeeb-14c4b474a364"
    },
    {
      name: "Cable_Deadlift",
      img: 0
    },
    {
      name: "Nożyce_leżąc",
      img: 0
    },
    {
      name: "odwodzenie_nogi_w_tył_klęcząc",
      img: 0
    },
    {
      name: "Odwodzenie_nogi_w_tył_na_maszynie",
      img: 0
    },
    {
      name: "Odwodzenie_nogi_w_tył_ze_zgięciem_kolana_klęcząc",
      img: 0
    },
    {
      name: "Odwodzenie_nogi_z_linką_wyciągu_stojąc",
      img: 0
    },
    {
      name: "Odwodzenie_nóg_na_maszynie_siedząc",
      img: 0
    },
    {
      name: "Przeciąganie_linki_wyciągu_stojąc",
      img: 0
    },
    {
      name: "Laverage_Machine_Standing_Squats",
      img: 0
    },
    {
      name: "Incline_Bench_Machine_Squats",
      img: 0
    },
    {
      name: "Smith_Machine_Standing_Front_Squats",
      img: 0
    },
    {
      name: "Kneeling_Barbell_Squats",
      img: 0
    },
    {
      name: "Deep_Squat",
      img: 0
    },
    {
      name: "Standing_Neck_Barbell_Squats",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_squat.png?alt=media&token=1e34a8b1-41c0-4229-8092-b6fb7e52b609"
    },
    {
      name: "Back_Squats",
      img: 0
    },
    {
      name: "Seated_Machine_Legs_Adduction",
      img: 0
    },
    {
      name: "Standing_Barbell_Back_Curls",
      img: 0
    },
    {
      name: "Unoszenie_bioder_ugięte_nogi_leżąc",
      img: 0
    },
    {
      name: "Weighted_Walking_Lunges",
      img: 0
    },
    {
      name: "Lunges_with_Barbell",
      img: 0
    },
    {
      name: "Incline_Press_Machine_Leg_Press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fincline_dumbbell_press.png?alt=media&token=c7a31148-ce81-4d1a-aa29-bb01c3c662c6"
    },

  ],

  hamstrings: [
    {
      name: "clean_deadlift",
      img: 0
    },
    {
      name: "romanian_deadlift_from_deficit",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fromanian_dead_lift.png?alt=media&token=3f3c1abc-e255-4e14-aa5d-d267842eeaa3"
    },
    {
      name: "kettlebell_one_legged_deadlift",
      img: 0
    },
    {
      name: "power_snatch",
      img: 0
    },
    {
      name: "hang_snatch",
      img: 0
    },
    {
      name: "floor_glute_ham_raise",
      img: 0
    },
    {
      name: "power_clean_from_blocks",
      img: 0
    },
    {
      name: "lying_leg_curls",
      img: 0
    },
    {
      name: "sumo_deadlift",
      img: 0
    },
    {
      name: "Standing_Cable_Leg_Curls",
      img: 0
    },
    {
      name: "Front_Lying_Machine_Legs_Curls",
      img: 0
    },
    {
      name: "Seated_Machine_Legs_Curls",
      img: 0
    },
    {
      name: "Standing_Machine_Legs_Curls",
      img: 0
    },

  ],

  lats:[
    {
      name: "Leverage_iso_row",
      img: 0
    },
    {
      name: "Wide_grip_lat_pull_down",
      img: 0
    },
    {
      name: "Underhand_cable_pull_down",
      img: 0
    },
    {
      name: "Straight_arm_pull_down",
      img: 0
    },
    {
      name: "V_bar_pull_down",
      img: 0
    },
    {
      name: "Close_grip_front_lat_pull_down",
      img: 0
    },
    {
      name: "V_bar_pull_up",
      img: 0
    },
    {
      name: "Rocky_pull_up",
      img: 0
    },
    {
      name: "Chin_up",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fchin_ups.png?alt=media&token=d272781e-04f3-471d-ac12-ed350eb92a63"
    },

  ],

  lowBack: [
    {
      name: "Wide_Stand_Barbell_Sumo_Deadlift",
      img: 0
    },
    {
      name: "Dumbbell_Deadlift",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fdumbbell_dead_lifts.png?alt=media&token=7c768858-6847-4b0f-ace7-c53499bab73b"
    },
    {
      name: "Barbell_Deadlift",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_dead_lifts.png?alt=media&token=746b81a8-87e8-4a77-aeeb-14c4b474a364"
    },
    {
      name: "Cable_Deadlift",
      img: 0
    },
    {
      name: "Prostowanie_grzbietu_na_maszynie",
      img: 0
    },
    {
      name: "Prostowanie_grzbietu_na_maszynie_siedząc",
      img: 0
    },
    {
      name: "Prostowanie_grzbietu_na_ławce_poziomej_leżąc_przodem",
      img: 0
    },
    {
      name: "Przeciąganie_linki_wyciągu_stojąc",
      img: 0
    },
    {
      name: "Laverage_Machine_Standing_Squats",
      img: 0
    },
    {
      name: "Kneeling_Barbell_Squats",
      img: 0
    },
    {
      name: "Standing_Deep_Squat",
      img: 0
    },
    {
      name: "Standing_Neck_Barbell_Squats",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_squat.png?alt=media&token=1e34a8b1-41c0-4229-8092-b6fb7e52b609"
    },
    {
      name: "Front_Lying_Back_Curls",
      img: 0
    },
    {
      name: "Seated_Barbell_Back_Curls",
      img: 0
    },
    {
      name: "Standing_Barbell_Back_Curls",
      img: 0
    },

  ],

  middleBack: [
    {
      name: "Barbell_deadlift",
      img: 0
    },
    {
      name: "Bent_over_barbell_deadlift",
      img: 0
    },
    {
      name: "Wide_grip_pull_up",
      img: 0
    },
    {
      name: "Standing_t_bar_row",
      img: 0
    },
    {
      name: "Wide_grip_seated_cable_row",
      img: 0
    },
    {
      name: "Reverse_grip_smith_machine_row",
      img: 0
    },
    {
      name: "Close_grip_pull_down",
      img: 0
    },
    {
      name: "Single_arm_dumbbell_row",
      img: 0
    },
    {
      name: "Decline_bench_dumbbell_pull_over",
      img: 0
    },
    {
      name: "Single_arm_smith_machine_row",
      img: 0
    },
    {
      name: "Medium_Overhand_Grip_Pull_up",
      img: 0
    },
    {
      name: "Assisting_Machine_Wide_Overhand_Grip_Pull_up",
      img: 0
    },
    {
      name: "Assisting_Machine_Medium_Overhand_Grip_Pull_up",
      img: 0
    },
    {
      name: "Wide_Underhand_Grip_Pull_up",
      img: 0
    },
    {
      name: "Medium_Underhand_Grip_Pull_up",
      img: 0
    },
    {
      name: "Assisting_Machine_Wide_Overhand_Grip_Pull_up",
      img: 0
    },
    {
      name: "Assisting_Machine_Medium_Overhand_Grip_Pull_up",
      img: 0
    },
    {
      name: "Wide_Overhand_Grip_Pull_up",
      img: 0
    },
    {
      name: "Tipup_ze_sztangą_w_opadzie_stojąc",
      img: 0
    },
    {
      name: "Leverage_Machine_Seated_Row",
      img: 0
    },
    {
      name: "Seated_Cable_Row",
      img: 0
    },
    {
      name: "Decline_Seated_Cable_Row",
      img: 0
    },
    {
      name: "Bench_Dumbbell_Row_Front_Lying ",
      img: 0
    },
    {
      name: "Bent_Over_Dumbbell_Row",
      img: 0
    },
    {
      name: "Smith_Machine_Standing_Bent_Over_Row",
      img: 0
    },
    {
      name: "Bench_Barbell_Row_Front_Lying ",
      img: 0
    },
    {
      name: "Reverse_Grip_Bent_Over_Barbell_Rows",
      img: 0
    },
    {
      name: "Bent_Over_Barbell_Row",
      img: 0
    },
    {
      name: "Ściąganie_droążka_wyciągu_górnego_do_karku_szeroki_rozstaw_rąk_siedząc",
      img: 0
    },
    {
      name: "Ściąganie_drażka_wyciągu_górnego_do_klatki_piersiowej_nadchwytem_wąski_rozstaw_rąk",
      img: 0
    },
    {
      name: "Ściąganie_drążka_wyciągu_górnego_do_klatki_piersiowej_podchwytem_wąski_rozstaw_rąk",
      img: 0
    },
    {
      name: "Ściąganie_drążka_wyciągu_górnego_do_klatki_piersiowej_szeroki_rozstaw_rąk",
      img: 0
    },
    {
      name: "Ściąganie_na_maszynie_leverage_siedząc",
      img: 0
    },

  ],

  quads: [
    {
      name: "Box_squat_with_bands",
      img: 0
    },
    {
      name: "Barbell_lunge",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_lunges.png?alt=media&token=5a2028fb-0c6e-46ca-90e4-970e41cd421f"
    },
    {
      name: "Narrow_stance_squats",
      img: 0
    },
    {
      name: "Goblet_squat",
      img: 0
    },
    {
      name: "Frankenstein_squat",
      img: 0
    },
    {
      name: "Box_squat",
      img: 0
    },
    {
      name: "Kettlebell_pistol_squat",
      img: 0
    },
    {
      name: "Front_squat_clean_grip",
      img: 0
    },
    {
      name: "Barbell_squat",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_squat.png?alt=media&token=1e34a8b1-41c0-4229-8092-b6fb7e52b609"
    },
    {
      name: "Front_squats_with_two_kettlebells",
      img: 0
    },
    {
      name: "Dynamiczne_podskoki",
      img: 0
    },
    {
      name: "Dumbbell_Deadlift",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fdumbbell_dead_lifts.png?alt=media&token=7c768858-6847-4b0f-ace7-c53499bab73b"
    },
    {
      name: "Barbell_Deadlift",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_dead_lifts.png?alt=media&token=746b81a8-87e8-4a77-aeeb-14c4b474a364"
    },
    {
      name: "Cable_Deadlift",
      img: 0
    },
    {
      name: "Odwodzenie_nóg_na_maszynie_siedząc",
      img: 0
    },
    {
      name: "Odwodznie_nóg_na_maszynie_stojąc",
      img: 0
    },
    {
      name: "Prostowanie_nóg_na_maszynie_siedząc",
      img: 0
    },
    {
      name: "Laverage_Machine_Standing_Squats",
      img: 0
    },
    {
      name: "Incline_Bench_Machine_Squats",
      img: 0
    },
    {
      name: "Smith_Machine_Standing_Front_Squats",
      img: 0
    },
    {
      name: "Smith_Machine_Standing_Back_Squats",
      img: 0
    },
    {
      name: "Deep_Squat",
      img: 0
    },
    {
      name: "Standing_Neck_Barbell_Squats",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_squat.png?alt=media&token=1e34a8b1-41c0-4229-8092-b6fb7e52b609"
    },
    {
      name: "Back_Squats",
      img: 0
    },
    {
      name: "Seated_Machine_Legs_Adduction",
      img: 0
    },
    {
      name: "Standing_Machine_Legs_Adduction",
      img: 0
    },
    {
      name: "Step_with_Dumbbells",
      img: 0
    },
    {
      name: "Step_with_Barbell",
      img: 0
    },
    {
      name: "Lunges_with_Barbell",
      img: 0
    },
    {
      name: "Lunges_with_Bag",
      img: 0
    },
    {
      name: "Lunges_with_Dumbbells",
      img: 0
    },
    {
      name: "Incline_Press_Machine_Leg_Press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fincline_dumbbell_press.png?alt=media&token=c7a31148-ce81-4d1a-aa29-bb01c3c662c6"
    },

  ],

  shoulders: [
    {
      name: "Cable_reverse_flye",
      img: 0
    },
    {
      name: "Bent_over_dumbbell_lateral_raise",
      img: 0
    },
    {
      name: "One_arm_cable_lateral_raise",
      img: 0
    },
    {
      name: "Cable_front_raise",
      img: 0
    },
    {
      name: "Push_press",
      img: 0
    },
    {
      name: "Wide_grip_smith_machine_upright_row",
      img: 0
    },
    {
      name: "Face_pull",
      img: 0
    },
    {
      name: "Dumbbell_lateral_raise",
      img: 0
    },
    {
      name: "Seated_barbell_shoulder_press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fseated_barbell_shoulder_press.png?alt=media&token=ec4eef97-7901-4956-9dda-ba00793421e3"
    },
    {
      name: "Seated_dumbbell_shoulder_press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fdumbbell_shoulder_press.png?alt=media&token=efef3354-3a51-499e-bce2-45aa6b928f17"
    },
    {
      name: "Machine_Reverse_Dumbbell_Flys",
      img: 0
    },
    {
      name: "Seated_Machine_Reverse_Dumbbell_Flys",
      img: 0
    },
    {
      name: "Front_Reverse_Dumbbell_Flys",
      img: 0
    },
    {
      name: "Hand-stand_Push-ups",
      img: 0
    },
    {
      name: "Standing_Single-arm_Front_Cable_Raise",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ffront_barbell_raises.png?alt=media&token=19da6b2e-fe8a-41f3-8b1d-09616c127817"
    },
    {
      name: "Leaning_Dumbbel_Lateral_Raise",
      img: 0
    },
    {
      name: "Standing_Front_Cable_Raise",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Ffront_barbell_raises.png?alt=media&token=19da6b2e-fe8a-41f3-8b1d-09616c127817"
    },
    {
      name: "Standing_Barbell_Plate_Front_Raise",
      img: 0
    },
    {
      name: "Standing_Dumbbell_Front_Raise",
      img: 0
    },
    {
      name: "Standing_Barbell_Front_Raise",
      img: 0
    },
    {
      name: "Cable_Lateral_Raise",
      img: 0
    },
    {
      name: "Standing_Upright_Barbell_Row",
      img: 0
    },
    {
      name: "Standing_Upright_Cable_Row",
      img: 0
    },
    {
      name: "Standing_Upright_Smith_Machine_Barbell_Row",
      img: 0
    },
    {
      name: "Wyciskanie_sprzed_głowy_na_maszynie_siedząc",
      img: 0
    },
    {
      name: "Wyciskanie_sprzed_głowy_na_suwnicy_Smitha_siedząc",
      img: 0
    },
    {
      name: "Standing_Back_Barbell_Press",
      img: 0
    },
    {
      name: "Standing_Barbell_Press_Behind_Neck",
      img: 0
    },
    {
      name: "Incline_Seated_Dumbell_Press",
      img: 0
    },
    {
      name: "Seated_Dumbell_Press",
      img: 0
    },


  ],

  traps: [
    {
      name: "Barbell_shrug",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbarbell_shrugs.png?alt=media&token=77cdacfd-73bc-4fca-a406-de976f3fb380"
    },
    {
      name: "Barbell_shrug_behind_the_back",
      img: 0
    },
    {
      name: "Cable_shrugs",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fcable_shoulder_shrugs.png?alt=media&token=f808a2d7-f971-40d5-996f-5c76de811a14"
    },
    {
      name: "Calf_machine_shoulder_shrug",
      img: 0
    },
    {
      name: "Clean_shrug",
      img: 0
    },
    {
      name: "Dumbbell_shrug",
      img: 0
    },
    {
      name: "Kettlebell_sumo_high_pull",
      img: 0
    },
    {
      name: "Leverage_shrug",
      img: 0
    },
    {
      name: "Scapular_pull_up",
      img: 0
    },
    {
      name: "Smith_machine_behind_the_back_shrug",
      img: 0
    },
    {
      name: "Smith_machine_shrug",
      img: 0
    },
    {
      name: "Smith_machine_upright_row",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fsmith_machine_upright_row.png?alt=media&token=52c21cfc-74f1-484d-9f1b-026dd6be79e6"
    },
    {
      name: "Snatch_shrug",
      img: 0
    },
    {
      name: "Standing_dumbbell_upright_row",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fdumbbell_upright_rows.png?alt=media&token=2db9bd70-6994-4b9e-9066-75ebaa49d8a7"
    },
    {
      name: "Upright_cable_row",
      img: 0
    },
    {
      name: "Upright_row_with_bands",
      img: 0
    },


  ],

  triceps: [
    {
      name: "Dumbbell_rollbacks",
      img: 0
    },
    {
      name: "Board_close_grip_bench_press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbench_press.png?alt=media&token=eb9ea58c-5681-4030-a12f-4b7cba6753a6"
    },
    {
      name: "Kickbacks_with_a_twist",
      img: 0
    },
    {
      name: "Rep_hold_push_downs",
      img: 0
    },
    {
      name: "Odwodzenie_przedramion_z_linkami_wyciągu_w_opadzie",
      img: 0
    },
    {
      name: "Odwodzenie_przedramion_z_hantlami_w_opadzie",
      img: 0
    },
    {
      name: "Dips",
      img: 0
    },
    {
      name: "Assisting_Machine_Dips",
      img: 0
    },
    {
      name: "Wide_Grip_Dips",
      img: 0
    },
    {
      name: "Raised_Legs_Dips",
      img: 0
    },
    {
      name: "Close_Grip_Push_ups",
      img: 0
    },
    {
      name: "Prostowanie_przedramion_na_wyciagu_górnym_na_linkach",
      img: 0
    },
    {
      name: "Prostowanie_przedramion_na_wyciągu_nad_głową_klęcząc",
      img: 0
    },
    {
      name: "Prostowanie_przedramion_na_wyciągu_nad_głową_stojąc",
      img: 0
    },
    {
      name: "Prostowanie_przedramion_na_wyciągu_nad_głową_w_opadzie",
      img: 0
    },
    {
      name: "Przeciąganie_linki_wyciągu_do_przeciwległego_barku_klęcząc",
      img: 0
    },
    {
      name: "Wyciskanie_francuskie_nad_głową_sztangi_łamanej_siedząc",
      img: 0
    },
    {
      name: "Bench_French_Press_Cable_Row",
      img: 0
    },
    {
      name: "Standing_French_Press_Cable_Row",
      img: 0
    },
    {
      name: "Incline_Bench_French_Press_Cable_Row",
      img: 0
    },
    {
      name: "Wyciskanie_francuskie_na_linkach_wyciągu_podchwytem_stojąc",
      img: 0
    },
    {
      name: "Machine_Seated_French_Press",
      img: 0
    },
    {
      name: "Bench_French_E_Z_Bar_Press",
      img: 0
    },
    {
      name: "Incline_Bench_French_E_Z_Bar_Press",
      img: 0
    },
    {
      name: "Decline_Bench_French_E_Z_Bar_Press",
      img: 0
    },
    {
      name: "Reverse_Grip_Bench_French_E_Z_Bar_Press",
      img: 0
    },
    {
      name: "Incline_Two_Arm_French_Dumbbell_Press",
      img: 0
    },
    {
      name: "One_Arm_Seated_Dumbbell_Press",
      img: 0
    },
    {
      name: "Two_Arm_Seated_Dumbbell_Press",
      img: 0
    },
    {
      name: "Close_Grip_Incline_Smith_Machine_Bench_Press",
      img: 0
    },
    {
      name: "Close_Grip_Decline_Smith_Machine_Bench_Press",
      img: 0
    },
    {
      name: "Close_Grip_Smith_Machine_Bench_Press",
      img: 0
    },
    {
      name: "Close_Grip_Incline_Barbell_Bench_Press",
      img: 0
    },
    {
      name: "Close_Grip_Barbell_Bench_Press",
      img: "https://firebasestorage.googleapis.com/v0/b/gymgang-a6459.appspot.com/o/localimages%2Fbench_press.png?alt=media&token=eb9ea58c-5681-4030-a12f-4b7cba6753a6"
    },
    {
      name: "Clos_Grip_Decline_Barbell_Bench_Press",
      img: 0
    },
    {
      name: "Tate_Press_Dumbbell_Press",
      img: 0
    },

  ],
};

let CardioExercises = [
  {
    name: "Bike",
    img: 0
  },
  {
    name: "Track",
    img: 0
  },
  {
    name: "Stairs",
    img: 0
  },
  {
    name: "Elliptical",
    img: 0
  },
  {
    name: "Rower",
    img: 0
  },

];

let DifficultyLevel = [
  {
    name: "Beginner",
    img: 0
  },
  {
    name: "Intermediate",
    img: 0
  },
  {
    name: "Expert",
    img: 0
  },

];

let FunctionalExercises = [
  {
    name: "Burpee",
    img: 0
  },
  {
    name: "MountineClimber",
    img: 0
  },
  {
    name: "Pompki",
    img: 0
  },
  {
    name: "PompkinaPilce",
    img: 0
  },
  {
    name: "PompkinaBosu",
    img: 0
  },
  {
    name: "PompkinaKolanach",
    img: 0
  },
  {
    name: "MartwyCiagNaProstychNogach",
    img: 0
  },
  {
    name: "SkipBokserski",
    img: 0
  },
  {
    name: "Pajacyki",
    img: 0
  },
  {
    name: "SwingZkettlebell",
    img: 0
  },
  {
    name: "HipThrust",
    img: 0
  },
  {
    name: "Wykroki",
    img: 0
  },
  {
    name: "WykrokizHantlami",
    img: 0
  },
  {
    name: "WykrokizSztanga",
    img: 0
  },
  {
    name: "WykrokiBulgarskie",
    img: 0
  },
  {
    name: "Skakanka",
    img: 0
  },
  {
    name: "Plank",
    img: 0
  },
  {
    name: "PodporBokiem",
    img: 0
  },
  {
    name: "PodporTylem",
    img: 0
  },
  {
    name: "ElbowPlankKnee",
    img: 0
  },
  {
    name: "ElbowPlank",
    img: 0
  },
  {
    name: "BasicPlank",
    img: 0
  },
  {
    name: "ExtendedPlank",
    img: 0
  },
  {
    name: "PlankLegRaise",
    img: 0
  },
  {
    name: "PlankArmReach",
    img: 0
  },
  {
    name: "BallPlank",
    img: 0
  },
  {
    name: "OverheadPress",
    img: 0
  },
  {
    name: "Przysiady",
    img: 0
  },
  {
    name: "PrzysiadyzPilkaLekarska",
    img: 0
  },
  {
    name: "KlękaniezPilka",
    img: 0
  },
  {
    name: "WchodzeniePoSchodach",
    img: 0
  },
  {
    name: "UnoszeniePilkiPoPrzekatnej",
    img: 0
  },
  {
    name: "Nozyce",
    img: 0
  },
  {
    name: "PrzysiadyNaJednejNodze",
    img: 0
  },
  {
    name: "TRXprzysiadNaJednejNodze",
    img: 0
  },
  {
    name: "TRXwyciskanie",
    img: 0
  },
  {
    name: "TRXwioslowanieTRXwyciaganieRakNadGlowe",
    img: 0
  },
  {
    name: "TRXwyciaganieRakNadGlowe",
    img: 0
  },
  {
    name: "TRXpodciaganieKolanPodKlatkePiersiowa",
    img: 0
  },
  {
    name: "TRXdeska",
    img: 0
  },
  {
    name: "TRXunoszenieBioderDoGory",
    img: 0
  },

];

let GymAtlasExercise = [
  {
    name: "Traps",
    img: 0
  },
  {
    name: "Shoulders",
    img: 0
  },
  {
    name: "Chest",
    img: 0
  },
  {
    name: "Biceps",
    img: 0
  },
  {
    name: "Triceps",
    img: 0
  },
  {
    name: "Forearm",
    img: 0
  },
  {
    name: "Abs",
    img: 0
  },
  {
    name: "Lats",
    img: 0
  },
  {
    name: "Middle_back",
    img: 0
  },
  {
    name: "Lower_back",
    img: 0
  },
  {
    name: "Glutes",
    img: 0
  },
  {
    name: "Quads",
    img: 0
  },
  {
    name: "Hamstrings",
    img: 0
  },
  {
    name: "Calves",
    img: 0
  },

];


let MusclePart = false;
let MaleBodyParts = false;
let FemaleBodyParts = false;

let Clear = () => {
  FirebaseLinks.maleBodyParts.remove();
  FirebaseLinks.femaleBodyParts.remove();
  FirebaseLinks.muscleParts.remove();
  FirebaseLinks.muscleExericises.remove();
  FirebaseLinks.functionalExercises.remove();
};

Clear();

let addMuscleParts = (element, index, array) => {
  firebase.database().ref('muscleParts').push({
    name: element.name,
    maleImg: element.maleImg,
    femaleImg: element.femaleImg
  });

  if (index === array.length - 1){
      MusclePart = true;
  }
}

let addMaleBodyParts = (element, index, array) => {
   FirebaseLinks.maleBodyParts.push({
      name: element.name,
      img: element.img,
   });

   if (index === array.length - 1){
       MaleBodyParts = true;
   }
}

let addFemaleBodyParts = (element, index, array) => {
   FirebaseLinks.femaleBodyParts.push({
      name: element.name,
      img: element.img,
    });

    if (index === array.length - 1){
        FemaleBodyParts = true;
    }
}

FirebaseLinks.muscleExericises.set(MuscleExercises);
FirebaseLinks.functionalExercises.set(FunctionalExercises);

let Exit = () => { process.exit(0); };

let musclePartsPromise = new Promise((resolve, reject) => {
  resolve(muscleParts.forEach(addMuscleParts))
})

let bodyPartsMalePromise = new Promise((resolve, reject) => {
  resolve(bodyPartsMale.forEach(addMaleBodyParts))
})

let bodyPartsFemalePromise = new Promise((resolve, reject) => {
  resolve(bodyPartsFemale.forEach(addFemaleBodyParts))
})

musclePartsPromise.then((successMessage) => {
  console.log("Muscle Parts are added");

  bodyPartsMalePromise.then((successMessage) => {
    console.log("Body Parts Male are added");

    bodyPartsFemalePromise.then((successMessage) => {
      console.log("Body Parts Frmale are added");
      Exit()
    });
  });
});
