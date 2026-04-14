TODO - voir ia_learning_module.md
_____________________________________________________________________________________
_____________________________________________________________________________________

Template 'modulefacesTab' pour module

---

P modulefacesTab
  doc `
    ##role
        Modèle pour les modules qui affichent des faces successives par index
        // TODO préciser la description
  
    ##usage
        P modulePages <modulefacesTab: PAGE; page>
  
    ##navigation
        <piece>.sendTag("<@tagName>_<index>");
  `
  contract {timeline_isolated = true} // security
  template {
    @TagName
    @ParamName
  }
  modele { // Notez la Syntaxe de tableau de valeur
    PF isolation : group
        P pages
            T tag[@index:PAGE_@index] // @index is unic in Piece
            T stop[0]
            T face[@index:@TagName_@index]
            F fpage_@index    = --@ParamName-@index    
  }

---

Ce qui permettrait de créer 
P modulePages <modulefacesTab: PAGE; page>

---

_____________________________________________________________________________________
_____________________________________________________________________________________


Template 'modulefacesList' pour module

---
P moduleFacesList
  doc `
    ##role
        Modèle pour les modules qui affichent des faces successives par tags spécifiques

    ##usage
        P moduleMessages <moduleFacesList: 
            [MESSAGE_IDLE, MESSAGE_ERROR_1, MESSAGE_ERROR_2, MESSAGE_OK];
            [message_idle, message_error1, message_error2, message_ok]>

    ##navigation
        <piece>.sendTag("<@TagNames[index]>");
  `
  contract {timeline_isolated = true}
  template {
    [@TagNames]
    [@ParamNames]
  }
  modele {
    PF isolation : group
      P pages
        T tag[@index:@TagNames[@index]]
        T stop[0]
        T face[@index:f_@index]
        F f_@index = --@ParamNames[@index]
  }
---

Ce qui permettrait de créer 
        P moduleMessages <modulefacesList: [MESSAGE_IDLE, MESSAGE_ERROR_1, MESSAGE_ERROR_2, MESSAGE_OK]; [message_idle,message_error1,message_error2,message_ok]>


---
