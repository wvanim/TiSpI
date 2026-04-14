https://www.wvanim.fr/p/ia_prompt/download_textfile.php?id=https://www.wvanim.fr/p/ia_prompt/data/tispi_datas_rules_en.html





P root
  F f0 group

    PF bg : image "myimage.png"

    PF label : text "Hello world"

    P isolation_button
      F f0 group
        P button
          T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
          T stop[0]
          T face[0,fOut ; 1,fOver ; 2,fPushed]
          F fOut    image "btn_out.png"
          F fOver   image "btn_over.png"
          F fPushed image "btn_pushed.png"

    P isolation_rollover
      F f0 group
        P rollover
          T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
          T stop[0]
          T face[0,fOut ; 1,fOver]
          F fOut  image "roll_out.png"
          F fOver image "roll_over.png"