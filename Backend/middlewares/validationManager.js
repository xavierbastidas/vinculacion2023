import { validationResult , body} from "express-validator";
export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ success: false, message: "Error in data validation"});
  }
  next();
};


export const bodyRegisterValidator = [
    [
        body('correo_usuario', 'Incorrect email format')
          .trim()
          .isEmail()
          .normalizeEmail(),
        body('contrasenia', 'Minimum 8 characters').trim().isLength({ min: 8 }), 
      ],
      validationResultExpress
];



export const bodyRegisterValidatorAP = [
  [
    body('Nombre', 'Please fill Nombre field').not().isEmpty().trim(),
    body('Apellido', 'Please fill Apellido field').not().isEmpty().trim(),
    body('id_usuario_pertenece','Please fill id_usuario_pertenece field').not().isEmpty().trim(),
  ],
  validationResultExpress
];



export const bodyLoginValidator = [[body('correo_usuario','Incorrect email format')
.trim()
.isEmail().normalizeEmail(),
body('contrasenia','Minimum 8 characters').trim().isLength({min:6})
]
,
validationResultExpress
]
