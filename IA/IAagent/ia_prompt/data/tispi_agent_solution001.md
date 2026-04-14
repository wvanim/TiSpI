# Exercice 1

Ici, vous êtes un vérificateur de script Tispi.
Réponse attendue : oui ou non, avec une ligne explicative.

P root
  F f0 group

    PF bg : image "myimage.png"

    P button1
      T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
      T stop[0]
      T face[0,fOut ; 1,fOver ; 2,fPushed]
      F fOut    image "btn1_out.png"
      F fOver   image "btn1_over.png"
      F fPushed image "btn1_pushed.png"

    P button2
      T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]
      T stop[0]
      T face[0,fOut ; 1,fOver ; 2,fPushed]
      F fOut    image "btn2_out.png"
      F fOver   image "btn2_over.png"
      F fPushed image "btn2_pushed.png"


# Solution exercice 1

Avez-vous vu l'erreur de synchronisation

- F f0 group (* Toutes les Pieces d’un même group partagent la même horloge (playhead) *)
- Donc le survole de bouton 1 changera l'état de bouton 2.
    P button1
      T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED]

- Solution : placer chaque bouton dans un groupe dédié à sa synchro. 

---

Le reste est juste.

---


# exercice 2

Compose une page UI contenant :
- une image statique
- un texte statique
- un bouton à 3 états
- un rollover à 2 états

Contraintes :
- ne pas utiliser de modules
- produire une structure Tispi valide

# solution exercice n°2

Comparez votre réponse à cet structure.

P root  (* l'optimisation est aussi accepté : PF root: group *)  
  T tag[0,PAGE] (*optionnel*)
  T stop[0]     (*optionnel*)
  T face[0,f0] (*optionnel*)
  F f0 group (* le nom est optionnel *) 

    P bg    (* optimisation aussi accepté => PF bg : image "myimage.png" *) 
        F image "myimage.png" (* le nom de la Face est optionnelle car elle est seul dans la Piece *) 

    P label    (* optimisation aussi accepté => PF label : text "Hello world"*) 
        F text "Hello world" (* le nom de la Face est optionnelle car elle est seule dans la Piece*)  

    P isolation_button (* obligatoire synchro,  conflit de timeline *) 
                                 (*  +  et optimisation aussi acceptée : PF isolation_button : group *) 
      F f0 group  (* Nom optionnel, puisque seule Face dans la Piece *) 
        P button 
          T tag[0,MOUSE_OUT ; 1,MOUSE_OVER ; 2,MOUSE_PUSHED] (* Vérifier les balises *) 
          T stop[0] (* Uniquement sur 0 *) 
          T face[0,fOut ; 1,fOver ; 2,fPushed] (* vérifier les Faces - les noms importent peut.*) 
          F fOut    image "btn_out.png"   (* Le nom doit correspondre au 1er nom de la piste F face *) 
          F fOver   image "btn_over.png" (*  correspondance avec le 2ème nom *) 
          F fPushed image "btn_pushed.png" (*  correspondance avec le 2ème nom  *) 

    P isolation_rollover   (* Identique au bouton, avec seulement 2 états. *) 
      F f0 group
        P rollover
          T tag[0,MOUSE_OUT ; 1,MOUSE_OVER]
          T stop[0]
          T face[0,fOut ; 1,fOver]
          F fOut  image "roll_out.png"
          F fOver image "roll_over.png"

## Erreurs si vous ne respectez pas :          
- vos noms de Pièce filles directs d'une Face sont différents 
Exemple : Pieces : bg, label, isolation_button et isolation_rollover doivent être différent. Car ces pièces sont des fils directs d'un même groupe
- et réciproquement : vos noms de Face filles directs d'une Piece sont différents 

## Ne sont pas des erreurs
- tout ce qui est annoté **optionnel**
- vos noms sont différents de cette Exemple.
- si vous avez placé des Face-groupes à la place des Face-images. C'est même considéré comme meilleure réponse


Si vous avez des erreurs, pouvez vous les lister, sans explication.
Ne listez que les erreurs.







_____________________________________________________________________________________
_____________________________________________________________________________________
_____________________________________________________________________________________
_____________________________________________________________________________________


P moduleButton
  doc "3-state button"               // informational
  tags [MOUSE_OUT, MOUSE_OVER, MOUSE_PUSHED]  // informational
  contract(timeline_isolated = true) // security
  params(
    F --mouse-out,
    F --mouse-over,
    F --mouse-pushed
  )
  modele (
    PF isolation : group
        P button
            T tag[0:MOUSE_OUT ; 1:MOUSE_OVER ; 2:MOUSE_PUSHED]
            T stop[0]
            T face[0:fOut ; 1:fOver ; 2:fPushed]
            F fOut    = --mouse-out
            F fOver   = --mouse-over
            F fPushed = --mouse-pushed
  )

_____________________________________________________________________________________
_____________________________________________________________________________________

P moduleRollover
  doc "roll-over"               // informational
  tags [MOUSE_OUT, MOUSE_OVER]  // informational
  contract(timeline_isolated = true) // security
  params(
    F --mouse-out,
    F --mouse-over
  )
  modele (
    PF isolation : group
        P rollover
            T tag[0:MOUSE_OUT ; 1:MOUSE_OVER]
            T stop[0]
            T face[0:fOut ; 1:fOver]
            F fOut    = --mouse-out
            F fOver   = --mouse-over
  )
_____________________________________________________________________________________
_____________________________________________________________________________________

P modulePages
  doc "cadre paginé"               // informational
  tags [PAGE_@index]  // informational
  contract(timeline_isolated = true) // security
  params(
    F --page-@index
  )
  modele ( // Notez la Syntaxe de tableau de valeur
    PF isolation : group
        P pages
            T tag[@index:PAGE_@index] // @index is unic in Piece
            T stop[0]
            T face[@index:fpage_@index]
            F fpage_@index    = --page-@index    
  )

_____________________________________________________________________________________
_____________________________________________________________________________________

P moduleRequestPHP
  doc "Requête PHP générique avec états et isolation temporelle
       Usage : (
            P request M moduleRequestPHP
                --url = "my_php.php"
                --params = [--name, --pseudo]
                --sender = this._parent.form
                --on-success = "functionOk"
                --on-error = "functionError"
       )
       Métadonnées moteur :
       requires: phpRequest(--url, --params)
       produces: --message (rempli par la réponse PHP)
       emits on success: REQUEST_OK + send(--sender, --on-success, --message)
       emits on error:   REQUEST_ERROR + send(--sender, --on-error, --message)"
  tags [REQUEST_PENDING, REQUEST_OK, REQUEST_ERROR]
  contract(timeline_isolated = true)
  params(
    string --url,
    array --params,
    P --sender,
    func --on-success,
    func --on-error
  )
  modele (
    PF isolation : group
      P request
        // notez que le temps 0 n'est pas identifié par un tag car le moteur lance le temps 0,
        // et il n'est jamais rappelé par la suite du traitement. 
        T tag[1:REQUEST_PENDING ; 2:REQUEST_OK ; 3:REQUEST_ERROR]
        T stop[0]
        T face[1:fPending ; 2:fOk ; 3:fError]
        
        T action_immediate[
          0: phpRequest(--url, --params) ;
          2: {Tispi.send(--sender, --on-success, --message); Tispi.hide(_parent);} 
          3: {Tispi.send(--sender, --on-error, --message);  Tispi.hide(_parent);}
        ]
        
        F fPending text "Requête en cours…"
        F fOk text ""
        F fError text ""
  )
