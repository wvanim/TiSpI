# Les outils pour l'entrainement Tispi-structure

## Les type composites :
x ::= float
y ::= float
l ::= float
h ::= float

fontname ::=string
color ::= #hex
size ::= number
style ::= number
 
bounds ::= "*bounds*"? // pour test
color ::= "red" | "green" | "blue" | vide // pour test 
background ::= color?
textStyle ::= "*style*"? // pour test

## Faces

### text
  F name text
    params{
      bounds --bounds  
      color --bgColor
      textStyle --textStyle
      string --text
    }
    presentation
      F name text *bounds* red *style* "texte dans la zone"
        ou
      F name text "texte dans la zone"

### Image
  F name texteArea
    params{
      bounds --bounds  
      string --image
    }
    presentation
      F name image *bounds* "url/image.png"
        ou
      F name image "url/image.png"

M P moduleButton
  doc `
    ##role 
      3-state button               
        
    ##usage 
      P myButton M moduleButton
      --click = <function>
      --mouse-out = <face>
      --mouse-over = <face>
      --mouse-pushed = <face>     
  `
  contract {timeline_isolated = true} // security
  params {
    func --click
    F --mouse-out,
    F --mouse-over,
    F --mouse-pushed
  }
  modele {
    PF isolation : group
        P button
            T tag[0:MOUSE_OUT ; 1:MOUSE_OVER ; 2:MOUSE_PUSHED]
            T stop[0]
            T face[0:fOut ; 1:fOver ; 2:fPushed]
            F fOut    = --mouse-out
            F fOver   = --mouse-over
            F fPushed = --mouse-pushed
  }
_____________________________________________________________________________________
_____________________________________________________________________________________

M P moduleRollover
  doc `
    ##role
      roll-over
      
    ##usage 
      P myRollover M moduleRollover
      --mouse-out = <face>
      --mouse-over = <face>
  `    
  contract {timeline_isolated = true} 
  params {
    F --mouse-out,
    F --mouse-over
  }
  modele {
    PF isolation : group
        P rollover
            T tag[0:MOUSE_OUT ; 1:MOUSE_OVER]
            T stop[0]
            T face[0:fOut ; 1:fOver]
            F fOut    = --mouse-out
            F fOver   = --mouse-over
  }
_____________________________________________________________________________________
_____________________________________________________________________________________

M P modulePages
  doc `
    ##role
        cadre paginé
  
    ##usage
        P myPages M modulePages
            --page-<num_frame> = <face>
  
    ##navigation
        <piece>.sendTag(PAGE_<index>);
  `
  contract {timeline_isolated = true} // security
  params {
    F --page-@index
  }
  modele { // Notez la Syntaxe de tableau de valeur
    PF isolation : group
        P pages
            T tag[@index:PAGE_@index] // @index is unic in Piece
            T stop[0]
            T face[@index:fpage_@index]
            F fpage_@index    = --page-@index    
  }
_____________________________________________________________________________________
  
M P moduleMessages
  doc `
    ##role
        Cadre paginé pour messages (Idle / Ok / Errors)
        Le cadre visuel est défini par décoration.
        Les messages sont des chaînes de texte.

    ##usage
        P myMessages M moduleMessages
            --bounds = *bounds*
            --bg = red
            --textStyle = *style*
            --idle = "Message en attente..."
            --ok = "Opération réussie"
            --error-2 = "Erreur critique"
            --error-5 = "Données invalides"
            --error-9 = "Connexion perdue"

    ##tags
        MESSAGE_IDLE
        MESSAGE_OK
        MESSAGE_ERROR_<index>
  `
  contract(timeline_isolated = true)
  params(
    bounds --bounds,
    background --bg,
    textStyle --textStyle,
    string --idle,
    string --ok,
    string --error-@index
  )
  modele(
    PF isolation : group
        P pages
            T tag[0:MESSAGE_IDLE ; 1:MESSAGE_OK ; @index:MESSAGE_ERROR_@index]
            T stop[0]
            T text[0:--idle; 1:--ok; @index:--fError_@index]

            F f0 moduleText
                --bounds = --bounds
                --bgColor = --bg
                --textStyle = --textStyle
                --text = --idle
  )
_____________________________________________________________________________________
_____________________________________________________________________________________

Rappel : 
- une face unique n'a pas besoin de "piste face"
- un valeur reste présente jusqu'à la key suivante. Même si elle peut se combiner avec la vaaleur de la keys suivante.
  => donc une face restera active jusqu'à la key suivant ou jusqu'à la fin
  => donc une face unique est toujours active.
- syntaxe de la faceText
  F name text
    params{
      bounds --bounds  
      color --bgColor
      textStyle --textStyle
      string --text
    }
    presentation
      F name text *bounds* red *style* "texte dans la zone"
        ou
      F name text "texte dans la zone"


  
Nouveauté :
- les pistes de variables
  leur nom est précédé de "--" pour indiquer qu'il sagit de variable. Ex : --text[...] 
  elle indique 'évolutionde la valeur d'une variable dans une piste de la barre de temps
  Dans l'exemple ci-dessous, les texte change à chaque temps dans : T --text[...]  
- transition au niveau de la Piece, et au niveau de la key
```
    PF messIdentification : group
        P pages
            tr : [0.5s, easeOut, fade]
            T tag[0:MESSAGE_IDLE ; 1:MESSAGE_OK ; 2:MESSAGE_ERROR_0; 3:MESSAGE_ERROR_1]
            T stop[0]
            T nextTag[1:_parent[PAGE_2].foo[STATE_3]]
            T --text[0:"en attente"; 1:"Correct, continuons"; 2:"Erreur entrez le pseudo"; 3:"Erreur entrez le code-secret"]
            T --color[0:black, 1:green, 2:red, [0.5s, easeOut, explode]] // Notez qe red se propage jusqu-à la frame numéro 3

            F f0 text
                --bounds = [100, 200, 400, 30]
                --bgColor = white
                --textStyle = ["Arial", 12, B ]
                --text = ""
```
Est-ce que vous comprenez ce que fait ceci ?
_____________________________________________________________________________________
_____________________________________________________________________________________


P moduleRequestPHP
  doc`
    ##role
      Requête PHP générique avec états et isolation temporelle
      
    ##usage
      P request M moduleRequestPHP
        --url = "my_php.php"
        --params = --phpParams
        --sender = this._parent.form
        --on-success = "functionOk"
        --on-error = "functionError"

    ##navigation
      <pieceRequest>.requestPhp(params);
        
    ##behavior
      requestPhp() déplace automatiquement le playhead :
          => REQUEST_PENDING (requête en cours)
          => REQUEST_OK      (succès)
          => REQUEST_ERROR   (erreur)
    
    ##requires
      Tispi.phpRequest(--url, --params)
  `
  
  contract {
    timeline_isolated = true
    returns {
      emits on success: sender.receivePhp(--on-success, --message)
      emits on error:   sender.receivePhp(--on-error, --message)
      produces: --message (rempli par la réponse PHP)
    }
  }
  params {
    string --url,
    array --params,
    P --sender,
    func --on-success,
    func --on-error
  }
  modele {
    PF isolation : group
      P request
        // notez que le temps 0 n'est pas identifié par un tag car le moteur lance le temps 0,
        // et il n'est jamais rappelé par la suite du traitement. 
        T tag[0:REQUEST_WAIT, 1:REQUEST_IDLE: 2:REQUEST_PENDING ; 3:REQUEST_OK ; 4:REQUEST_ERROR]
        T stop[0]
        T face[2:fPending ; 3:fOk ; 4:fError]
        
        T action_immediate[
          1: phpRequest(--url, --params) ;
          3: {Tispi.send(--sender, --on-success, --message); Tispi.hide(_parent);} 
          4: {Tispi.send(--sender, --on-error, --message);  Tispi.hide(_parent);}
        ]
        
        F fPending text "Requête en cours…"
        F fOk text ""
        F fError text ""
  }







 
_____________________________________________________________________________________
_____________________________________________________________________________________  
_____________________________________________________________________________________
_____________________________________________________________________________________  
_____________________________________________________________________________________
_____________________________________________________________________________________  


_____________________________________________________________________________________
_____________________________________________________________________________________  
_____________________________________________________________________________________
_____________________________________________________________________________________  
_____________________________________________________________________________________
_____________________________________________________________________________________  








  
  
P pageLogin
  T tag[0:FORM ; 1:ERROR ; 2:SUCCESS]
  T stop[0]
  T face[0:fForm ; 1:fError ; 2:fSuccess]

  F fForm group
    PF bg        : image "login_bg.png"
    PF title     : text "Connexion"
    PF inputUser : input "Identifiant"
    PF inputPass : input "Mot de passe"

    P btnLogin M moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
      --click = () => {
        pageLogin.request.requestPhp();
      }

    P request M moduleRequestPHP
      --url        = "login.php"
      --params     =  () => [inputUser.value, inputPass.value]
      --sender     = this
      --on-success = (message) => {
        pageLogin.sendTag("SUCCESS");
      }
      --on-error   = (message) => {
        pageLogin.sendTag("ERROR");
      }

  F fError group
    PF bg     : image "login_bg.png"
    PF title  : text "Connexion"
    PF msgErr : text "Identifiant ou mot de passe incorrect."
    P btnRetry M moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
      --click = () => { pageLogin.sendTag("FORM"); }

  F fSuccess group
    PF bg    : image "login_bg.png"
    PF title : text "Connexion"
    PF msgOk : text "Bienvenue !"
    P btnHome M moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
      --click = () => { app.sendTag("HOME"); }
      
_____________________________________________________________________________________
_____________________________________________________________________________________      
      
      
      
      
P pageLogin
  T tag[0:FORM ; 1:ERROR ; 2:SUCCESS]
  T stop[0]
  T face[0:fForm ; 1:fError ; 2:fSuccess]

  F fForm group
    PF bg        : image "login_bg.png"
    PF title     : text "Connexion"
    PF inputUser : input "Identifiant"
    PF inputPass : input "Mot de passe"

    P msgLocal M modulePage
      --page-0 = F text "Veuillez entrer votre pseudo et votre code secret"
      --page-1 = F text "Erreur veuillez entre votre pseudo"
      --page-2 = F text "Erreur veuillez entre votre code secret"    
      --page-3 = F text "Identifiants en traitement"    

    P btnLogin M moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
      --click = () => {
        // ##emits _parent.msgLocal : PAGE_0, PAGE_1, PAGE_2, PAGE_3
        if validUser(_parent.msgLocal, PAGE_1, PAGE_2, PAGE_3) {
          pageLogin.login.requestPhp();
        }
      }

    P request M moduleRequestPHP
      --url        = "login.php"
      --params     =  () => [inputUser.value, inputPass.value]
      --sender     = this
      --on-success = (message) => {
        pageLogin.sendTag("SUCCESS");
      }
      --on-error   = (message) => {
        pageLogin.sendTag("ERROR");
      }

  F fError group
    PF bg     : image "login_bg.png"
    PF title  : text "Connexion"
    PF msgErr : text "Identifiant ou mot de passe incorrect."
    P btnRetry M moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
      --click = () => { pageLogin.sendTag("FORM"); }

  F fSuccess group
    PF bg    : image "login_bg.png"
    PF title : text "Connexion"
    PF msgOk : text "Bienvenue !"
    P btnHome M moduleButton
      --mouse-out    = F image "btn_out.png"
      --mouse-over   = F image "btn_over.png"
      --mouse-pushed = F image "btn_pushed.png"
      --click = () => { app.sendTag("HOME"); }      
      
      
      
      
_____________________________________________________________________________________
_____________________________________________________________________________________
Exemple d'usage de cadre paginé


P msgLocal M modulePage
  --page-0 = F text "Veuillez entrer votre pseudo et votre code secret"
  --page-1 = F text "Erreur veuillez entre votre pseudo"
  --page-2 = F text "Erreur veuillez entre votre code secret"    
  --page-3 = F text "Identifiants en traitement"    
  
--click = () => {
    // ##emits _parent.msgLocal : PAGE_0, PAGE_1, PAGE_2, PAGE_3
    if validUser(_parent.msgLocal, PAGE_1, PAGE_2, PAGE_3) {
        pageLogin.login.requestPhp();
    }
}
